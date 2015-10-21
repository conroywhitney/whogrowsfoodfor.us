var
  fs   = require('fs'),
  http = require('http')
;

namespace('download', function() {

  const DATA_DIR = 'data/';
  const TEMP_DIR = 'tmp/';

  const FILEMAP = {
    counties: { from: 'http://www2.census.gov/geo/docs/reference/codes/files/national_county.txt', to: TEMP_DIR + 'county-fips.csv' },
    states:   { from: 'http://www2.census.gov/geo/docs/reference/state.txt', to: TEMP_DIR + 'state-fips.csv' }
  };

  task('all', ['tmpdir'], fuinction() {
    var
      keys = Object.keys(FILEMAP)
    ;

    for(key in keys) {
      downloadFileByKey(key)
    }
  });

  task('file', ['tmpdir'], function(key) {
    downloadFileByKey(key);
  });

  function downloadFileByKey(key) {
    var
      file = FILEMAP[key],
      from = file.from,
      to   = file.to
    };

    console.log('Downloading [' + from + '] => [' + to + ']');

    downloadUrlToPath(from, to, function() {
      console.log('[' + to + '] download complete');
      complete();
    });
  }

  desc('Creates a temporary folder to store the intermediate files we download');
  task('tmpdir', [], function() {
    jake.mkdirP(tmp);
  });

  function downloadUrlToPath(url, path, callback) {
    var
      file    = fs.createWriteStream(path),
      request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(callback);
        });
      }).on('error', function(err) {
        console.log('ERROR downloading [' + url + '] => [' + path + ']');
        fs.unlink(dest);
        callback(err);
      });
    ;
  }

});
