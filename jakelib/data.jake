var
  fs        = require('fs'),
  Converter = require("csvtojson").Converter
;

namespace('data', function() {

  desc('Creating a JSON file of county metadata from downloaded census information')
  task('counties', [], function() {
    console.log('Creating a JSON file of county metadata from downloaded census information');

    var
      download_countyFIPS = jake.Task['download:countyFIPS'],
      csvConverter = new Converter({
        headers: [
          'state_abbreviation',
          'state_fips',
          'county_fips_short',
          'county_name',
          'county_fips_class_code'
        ]
      })
    ;

    csvConverter.on("record_parsed",function(item, csv, index){
      // convert state fips to a string
      item.state_fips  = '' + item.state_fips;

      // create long fips code with state fips prepended
      item.county_fips = item.state_fips + item.county_fips_short;
    });

    csvConverter.on("end_parsed", function (jsonArray) {
      console.log('... transformation complete');
      console.log(jsonArray);
    });

    download_countyFIPS.addListener('complete', function(filepath) {
      console.log('Transforming county data ...');
      fs.createReadStream(filepath).pipe(csvConverter);
    });

    // kick-start the whole process
    download_countyFIPS.invoke();
  });

});
