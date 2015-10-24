var
  fs = require('fs')
;

namespace('products', function() {

  const datadir     = 'data/products';
  const tmpdir      = 'tmp/';

  desc('create list of agricultural products from USDA API');
  task('list', ['tmpdir'], {async: true}, function() {
    console.log('products:list\tbegin');

    var
      url      = 'http://nass-api.azurewebsites.net/api/get_dependent_param_values?agg_level_desc=COUNTY&year=2012&freq_desc=ANNUAL&distinctParams=commodity_desc',
      filename = tmpdir + 'list.json',
      download = jake.Task['download:generic']
    ;

    download.addListener('complete', function(filename) {
      console.log('products:list\ttransforming');

      var
        file     = fs.readFileSync(filename),
        json     = JSON.parse(file),
        products = json['data'][0]['Values']
      ;

      for(i = 0; i < products.length; i++) {
        var
          product = products[i],
          ignore  = new RegExp('OTHER|TOTALS|REPAIRS|INTERNET|AREA|HYBRIDS|TAXES|OPERATIONS|LABOR|FARM|LAND|SPAWN|FACILITY|SOD|LOANS|ENERGY|INTEREST|PRINCIPAL|DEPRECIATION|OPERATORS|SERVICES|PROGRAMS|PRACTICES|RENT|FUELS|ORNAMENTAL FISH|TREES & SHORT|FEED|HAYLAGE|PIGEONS|TEMPLES', 'gi')
        ;

        if(ignore.test(product) == false) {
          console.log("keeping: " + product);
        } else {
          console.log("ignoring: " + product);
        }

      }

    });

    download.invoke(url, filename);
  });

  function shouldInclude(product) {
    return
      /TOTALS$/.test(product)
    ;
  }



  desc('Creates a folder to store the temporary files we use to transform');
  task('tmpdir', [], function() {
    jake.mkdirP(tmpdir);
  });

  desc('Creates a folder to store the resultant data files we will use in the application');
  task('datadir', [], function() {
    jake.mkdirP(datadir);
  });

});
