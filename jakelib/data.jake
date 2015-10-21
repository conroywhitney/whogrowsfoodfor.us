var
  fs        = require('fs'),
  Converter = require("csvtojson").Converter
;

namespace('data', function() {

  const datadir           = 'data/';
  const tmpdir            = 'tmp/';
  const state_names_file  = tmpdir + 'state_names.json';
  const county_names_file = tmpdir + 'county_names.json';
  const labels_file       = datadir + 'labels.json';

  desc('Creating a JSON file of regional labels from downloaded census information')
  task('labels', ['datadir', 'stateNames', 'countyNames'], function() {
    console.log('Creating a combined JSON file of state and county names from tmp files');

    var
      transformer = require('../src/transformers/region_transformer'),
      output      = transformer.transform()
    ;

    fs.writeFile(labels_file, output, 'utf-8', function(err) {
      if (err) throw err;
      console.log('...transformation complete');
    });
  });

  desc('Create tmp file of county names from census information');
  task('countyNames', ['tmpdir'], { async: true }, function() {
    console.log('Creating a tmp file of county names from downloaded census information');

    var
      download_task = jake.Task['download:countyFIPS'],
      csvConverter  = new Converter({
        toArrayString: true,
        constructResult: true,
        headers: [
          'state_abbreviation',
          'state_fips_short',
          'county_fips_short',
          'county_name',
          'county_fips_class_code'
        ]
      })
    ;

    csvConverter.on("record_parsed", function(county, csv, index){
      // create long fips code with state fips prepended (make sure converted to strings first)
      // these are what will be used later for the final data/names.json datafile
      county.fips  = county.state_fips_short + '' + county.county_fips_short;
      county.short = county.county_name.replace(' County', '');
      county.long  = county.county_name + ', ' + county.state_abbreviation;
    });

    download_task.addListener('complete', function(input_path) {
      console.log('Transforming county data ...');
      var
        writer = fs.createWriteStream(county_names_file)
      ;

      writer.on('finish', function() {
        console.log("...county data: transformation complete");
        // tell whoever's waiting on us that we're done using jake callback
        writer.close(complete);
      })

      fs.createReadStream(input_path)
        .pipe(csvConverter)
        .pipe(writer)
      ;
    });

    // kick-start the whole process
    download_task.invoke();
  });

  desc('Create a tmp file of state names from census information')
  task('stateNames', ['tmpdir'], { async: true }, function() {
    console.log('Creating a tmp file of state names from downloaded census information');

    var
      download_task = jake.Task['download:stateFIPS'],
      csvConverter  = new Converter({
        toArrayString: true,
        constructResult: true,
        delimiter: "|",
        headers: [
          'state_fips',
          'state_abbreviation',
          'state_name',
          'state_ens'
        ]
      })
    ;

    csvConverter.on("record_parsed", function(state, csv, index){
      // convert fips into a string to preserve leading 0
      // add 000s for long code
      state.fips  = '' + state.state_fips + "000";
      state.short = state.state_abbreviation;
      state.long  = state.state_name;
    });

    download_task.addListener('complete', function(input_path) {
      console.log('Transforming state data ...');
      var
        writer = fs.createWriteStream(state_names_file)
      ;

      writer.on('finish', function() {
        console.log("...state data: transformation complete");
        // tell whoever's waiting on us that we're done using jake callback
        writer.close(complete);
      })

      fs.createReadStream(input_path)
        .pipe(csvConverter)
        .pipe(writer)
      ;
    });

    // kick-start the whole process
    download_task.invoke();
  });

  desc('Creates a folder to store the interstitial files we use to transform');
  task('tmpdir', [], function() {
    jake.mkdirP(tmpdir);
  });

  desc('Creates a folder to store the resultant files we transform');
  task('datadir', [], function() {
    jake.mkdirP(datadir);
  });

});
