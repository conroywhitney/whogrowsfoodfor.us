var
  fs       = require('fs'),
  csv2     = require('csv2'),
  through2 = require('through2'),
  flatten  = require('flat')
;

namespace('data', function() {

  const datadir = 'data/';

  desc('Creating a JSON file of county metadata from downloaded census information')
  task('counties', ['datadir'], function() {
    console.log('Creating a JSON file of county metadata from downloaded census information');

    var
      download_task = jake.Task['download:countyFIPS'],
      output_path   = datadir + 'counties.json'
    ;

    download_task.addListener('complete', function(filepath) {
      console.log('Transforming county data ...');
      fs
        .createReadStream(filepath)
        .pipe(csv2())
        .pipe(through2({ objectMode: true }, function (chunk, enc, callback) {
          var
            state_abbreviation     = chunk[0],
            state_fips_short       = chunk[1],
            county_fips_short      = chunk[2],
            county_name            = chunk[3],
            county_fips_class_code = chunk[4],
            county_fips            = state_fips_short + '' + county_fips_short,
            output                 = '"' + county_fips + '":"' + county_name + '",'
          ;

          this.push(output);

          callback()
        }))
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
