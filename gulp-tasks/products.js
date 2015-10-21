var
  gulp         = require('gulp-param')(require('gulp'), process.argv),
  gulpSequence = require('gulp-sequence'),
  fs           = require('fs'),
  download     = require('gulp-download'),
  replace      = require('gulp-replace'),
  insert       = require('gulp-insert'),
  parse        = require('csv-parse'),
  jeditor      = require("gulp-json-editor"),
  jsonRefactor = require('gulp-json-refactor'),
  rename       = require('gulp-rename'),
  slug         = require('slug'),
  TEMPDIR      = './tmp/',
  RAWDIR       = './data/raw/',
  DATADIR      = './data/'
;

gulp.task('product-list', function() {
  var
    url      = 'http://nass-api.azurewebsites.net/api/get_dependent_param_values?source_desc=CENSUS&year=2012&freq_desc=ANNUAL&agg_level_desc=COUNTY&distinctParams=commodity_desc',
    filename = 'product-list.json'
  ;
  download(url)
    .pipe(rename(filename))
    .pipe(gulp.dest(RAWDIR))
});

gulp.task('product-metadata', function() {
  var
    productList = RAWDIR + 'product-list.json',
    productsRaw = fs.readFileSync(productList),
    productJSON = JSON.parse(productsRaw),
    products    = productJSON["data"][0]["Values"],
    options     = ['class_desc', 'statisticcat_desc', 'util_practice_desc', 'prodn_practice_desc', 'unit_desc', 'domain_desc']
  ;

  products.forEach(function(product) {
    var
      productQSVar  = product,
      productSlug   = slug(productQSVar.toLowerCase(), '_'),
      productFolder = RAWDIR + productSlug
    ;

    options.forEach(function(option) {
      var
        url      = 'http://nass-api.azurewebsites.net/api/get_dependent_param_values?source_desc=CENSUS&year=2012&freq_desc=ANNUAL&agg_level_desc=COUNTY&distinctParams=' + option + '&commodity_desc=' + product,
        filename = productSlug + '_' + option + '.json'
      ;

      download(url)
        .pipe(jeditor(function(json) {
          if(!json || !json["data"]) { return []; }
          return json["data"][0]["Values"];
        }))
        .pipe(rename(filename))
        .pipe(gulp.dest(productFolder))
    });
  });

})

gulp.task('products', gulpSequence('product-list', 'product-metadata'));
