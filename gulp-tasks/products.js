var
  gulp         = require('gulp-param')(require('gulp'), process.argv),
  fs           = require('fs'),
  download     = require('gulp-download'),
  replace      = require('gulp-replace'),
  insert       = require('gulp-insert'),
  parse        = require('csv-parse'),
  jsonRefactor = require('gulp-json-refactor'),
  rename       = require('gulp-rename'),
  slug         = require('slug'),
  TEMPDIR      = './data/raw',
  DATADIR      = './data/'
;

gulp.task('product-list', function() {
  var
    url      = 'http://nass-api.azurewebsites.net/api/get_dependent_param_values?source_desc=CENSUS&year=2012&freq_desc=ANNUAL&agg_level_desc=COUNTY&distinctParams=commodity_desc',
    filename = 'product-list.json'
  ;
  download(url)
    .pipe(rename(filename))
    .pipe(gulp.dest(DATADIR))
});

gulp.task('product-metadata', function() {
  var
    productList    = DATADIR + 'product-list.json',
    productsRaw    = fs.readFileSync(productList),
    productJSON    = JSON.parse(productsRaw),
    products       = productJSON["data"][0]["Values"],
    baseClassURL   = 'http://nass-api.azurewebsites.net/api/get_dependent_param_values?source_desc=CENSUS&year=2012&freq_desc=ANNUAL&agg_level_desc=COUNTY&distinctParams=class_desc&commodity_desc=',
    baseOptionsURL = 'http://nass-api.azurewebsites.net/api/get_dependent_param_values?source_desc=CENSUS&year=2012&freq_desc=ANNUAL&agg_level_desc=COUNTY&distinctParams=statisticcat_desc&commodity_desc='
  ;

  products.forEach(function(product) {
    var
      productQSVar      = product,
      productSlug       = slug(productQSVar.toLowerCase()),
      productClassURL   = baseClassURL + productQSVar,
      productOptionsURL = baseOptionsURL + productQSVar,
      classFilename     = productSlug + '-classes.json',
      optionsFilename   = productSlug + '-options.json'
    ;

    download(productClassURL)
      .pipe(rename(classFilename))
      .pipe(gulp.dest(DATADIR))

    download(productOptionsURL)
      .pipe(rename(optionsFilename))
      .pipe(gulp.dest(DATADIR))
  });
});

