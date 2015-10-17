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
        constructResult: false,
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

      // we won't be using these again, so no point saving them
      delete item.state_fips_short;
      delete item.county_fips_short;
      delete item.county_fips_class_code;
    });

    csvConverter.on("end_parsed", function (jsonArray) {
      console.log('... transformation complete');
    });

    download_task.addListener('complete', function(filepath) {
      console.log('Transforming county data ...');
      fs
        .createReadStream(filepath)
        .pipe(csvConverter)
        .pipe(fs.createWriteStream(output_path))
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
