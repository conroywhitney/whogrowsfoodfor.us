var
  fs   = require('fs'),
  http = require('http')
;

namespace('download', function() {

  const tmp = 'tmp/';

  desc('Creates a temporary folder to store the intermediate files we download');
  task('tmpdir', [], function() {
    jake.mkdirP(tmp);
  });

  desc('Download the county-level FIPS data from the census bureau');
  task('countyFIPS', ['tmpdir'], {async: true}, function() {
    var
      path = tmp + 'county-fips.csv'
    ;
    download('http://www2.census.gov/geo/docs/reference/codes/files/national_county.txt', path, function() {
      complete(path);
    });
  });

  desc('Download the state-level FIPS data from the census bureau');
  task('stateFIPS', ['tmpdir'], {async: true}, function() {
    var
      path = tmp + 'state-fips.csv'
    ;
    download('http://www2.census.gov/geo/docs/reference/state.txt', path, function() {
      complete(path);
    });
  });

  function download(url, path, callback) {
    console.log('Downloading [' + url + '] to [' + path + ']...');
    var
      file    = fs.createWriteStream(path),
      request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          console.log('...finished downloading [' + url + '] to [' + path + ']');
          file.close(callback);
        });
      }).on('error', function(err) {
        console.log('ERROR downloading [' + url + '] to [' + path + ']');
        fs.unlink(dest);
        callback(err);
      });
    ;
  }

});
