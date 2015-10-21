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
  concat       = require('gulp-concat'),
  ifElse       = require('gulp-if-else'),
  replace      = require('gulp-replace'),
  dir          = require('node-dir'),
  jsonlint     = require("gulp-jsonlint"),
  TEMPDIR      = './tmp/',
  RAWDIR       = './data/raw/',
  DATADIR      = './data/',
  OPTIONS      = ['class_desc', 'statisticcat_desc', 'util_practice_desc', 'prodn_practice_desc', 'unit_desc', 'domain_desc']
;

function getProductList() {
  var
    productList = RAWDIR + 'product-list.json',
    productsRaw = fs.readFileSync(productList),
    productJSON = JSON.parse(productsRaw),
    products    = productJSON["data"][0]["Values"]
  ;

  return products;
}

function getProductProperties(product) {
  var
    productQSVar  = product,
    productSlug   = slug(productQSVar.toLowerCase(), '_'),
    productFolder = RAWDIR + productSlug
  ;

  return {
    qsVar:  productQSVar,
    slug:   productSlug,
    folder: productFolder
  }
}

function getOptionFilename(slug, option) {
  return slug + '_' + option + '.json';
}

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
    products = getProductList()
  ;

  products.forEach(function(product) {
    var
      props = getProductProperties(product)
    ;

    OPTIONS.forEach(function(option) {
      var
        url      = 'http://nass-api.azurewebsites.net/api/get_dependent_param_values?source_desc=CENSUS&year=2012&freq_desc=ANNUAL&agg_level_desc=COUNTY&distinctParams=' + option + '&commodity_desc=' + props.qsVar,
        filename = getOptionFilename(props.slug, option)
      ;

      download(url)
        .pipe(jeditor(function(json) { // get meat and potatoes of JSON object
          if(!json || !json["data"]) { return []; }
          return json["data"][0]["Values"];
        }))
        .pipe(insert.prepend('"' + option + '":')) // add option name before value array
        .pipe(rename(filename)) // set filename
        .pipe(gulp.dest(props.folder)) // write to fs
    });
  });

});

gulp.task('product-concat', function() {
  var
    products = getProductList()
  ;

  products.forEach(function(product) {
    var
      props = getProductProperties(product)
    ;

    gulp.src(props.folder + '/*.json')
      .pipe(insert.append(',')) // add , to end of each of the files in the folder
      .pipe(concat(props.slug + '_options.json')) // combine all files into single options file
      .pipe(insert.prepend('{"' + props.slug + '":{')) // wrap object with product name
      .pipe(insert.append('"agg_level_desc": ["NATIONAL", "STATE", "COUNTY"]}}')) // add item and end object
      .pipe(gulp.dest(props.folder)) // write to fs
      .pipe(jsonlint()) // ensure we created valid JSON object in file
      .pipe(jsonlint.reporter())
  });

});

gulp.task('product-values', function() {
  var
    products    = getProductList(),
    geographies = ['NATIONAL', 'STATE', 'COUNTY']
  ;

  products.forEach(function(product) {
    var
      props = getProductProperties(product)
    ;

  });

});

gulp.task('products', gulpSequence('product-list', 'product-metadata'));
