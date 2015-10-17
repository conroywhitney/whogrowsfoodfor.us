var
  fs        = require('fs'),
  Converter = require("csvtojson").Converter
;

namespace('data', function() {

  const datadir = 'data/';

  desc('Creating a JSON file of county metadata from downloaded census information')
  task('counties', ['datadir'], function() {
    console.log('Creating a JSON file of county metadata from downloaded census information');

    var
      download_task = jake.Task['download:countyFIPS'],
      output_path   = datadir + 'counties.json',
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

    csvConverter.on("record_parsed",function(item, csv, index){
      // create long fips code with state fips prepended (make sure converted to strings first)
      item.county_fips = item.state_fips_short + '' + item.county_fips_short;
    });

    csvConverter.on("end_parsed", function(counties) {
      var
        output = {}
      ;

      for(i = 0; i < counties.length; i++) {
        var county = counties[i];
        output[county.county_fips] = county.county_name;
      }

      fs.writeFile(output_path, JSON.stringify(output), 'utf-8', function(err) {
        if (err) throw err;
        console.log('...transformation complete');
      });
    });

    download_task.addListener('complete', function(filepath) {
      console.log('Transforming county data ...');
      fs
        .createReadStream(filepath)
        .pipe(csvConverter)
      ;
    });

    // kick-start the whole process
    download_task.invoke();
  });

  desc('Creating a JSON file of state metadata from downloaded census information')
  task('states', ['datadir'], function() {
    console.log('Creating a JSON file of state metadata from downloaded census information');

    var
      download_task = jake.Task['download:stateFIPS'],
      output_path   = datadir + 'states.json',
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

    csvConverter.on("record_parsed",function(item, csv, index){
      // convert fips into a string to preserve leading 0
      // add 000s for long code
      item.state_fips = '' + item.state_fips + "000";
    });

    csvConverter.on("end_parsed", function(states) {
      var
        output = {}
      ;

      for(i = 0; i < states.length; i++) {
        var state = states[i];
        output[state.state_fips] = {
          name: state.state_name,
          abbrev: state.state_abbreviation
        };
      }

      fs.writeFile(output_path, JSON.stringify(output), 'utf-8', function(err) {
        if (err) throw err;
        console.log('...transformation complete');
      });
    });

    download_task.addListener('complete', function(filepath) {
      console.log('Transforming state data ...');
      fs
        .createReadStream(filepath)
        .pipe(csvConverter)
      ;
    });

    // kick-start the whole process
    download_task.invoke();
  });

  desc('Creates a folder to store the resultant files we transform');
  task('datadir', [], function() {
    jake.mkdirP(datadir);
  });

});
