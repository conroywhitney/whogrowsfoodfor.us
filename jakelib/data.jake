var
  fs = require('fs')
;

namespace('data', function() {

  desc('Creating a JSON file of county metadata from downloaded census information')
  task('counties', [], function() {
    console.log('Creating a JSON file of county metadata from downloaded census information');

    var
      download_countyFIPS = jake.Task['download:countyFIPS'];
    ;

    download_countyFIPS.addListener('complete', function(filepath) {
      console.log('Transforming county data...');
      fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        console.log('...transformation complete');
      });
    });
    download_countyFIPS.invoke();

  });

});
