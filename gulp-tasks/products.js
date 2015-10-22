var
  gulp          = require('gulp-param')(require('gulp'), process.argv),
  gulpSequence  = require('gulp-sequence'),
  fs            = require('fs'),
  download      = require('gulp-download'),
  request       = require('request'),
  replace       = require('gulp-replace'),
  source        = require('vinyl-source-stream'),
  insert        = require('gulp-insert'),
  parse         = require('csv-parse'),
  jeditor       = require("gulp-json-editor"),
  jsonRefactor  = require('gulp-json-refactor'),
  jsonTransform = require('gulp-json-transform'),
  rename        = require('gulp-rename'),
  slug          = require('slug'),
  concat        = require('gulp-concat'),
  ifElse        = require('gulp-if-else'),
  replace       = require('gulp-replace'),
  dir           = require('node-dir'),
  jsonlint      = require("gulp-jsonlint"),
  cartesian     = require('cartesian-product'),
  R             = require('ramda'),
  q             = require('q'),
  urlencode     = require('urlencode'),
  promise       = require("gulp-promise"),
  productHelper = require('../src/product_helper'),
  TEMPDIR       = './tmp/',
  DATADIR       = './data/',
  RAWDIR        = './data/raw/',
  PRODDIR       = './data/products/',
  OPTIONS       = ['class_desc', 'statisticcat_desc', 'util_practice_desc', 'prodn_practice_desc', 'unit_desc', 'domain_desc']
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

function getFilteredProductList() {
  var
    allProducts      = getProductList(),
    filteredProducts = productHelper.filterProducts(allProducts)
  ;

  return filteredProducts;
}

function getFilteredOptions(option, productOptions) {
  var
    filteredOptions = productHelper.filterOptions(option, productOptions)
  ;

  return filteredOptions;
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
    products = getFilteredProductList()
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
    products = getFilteredProductList()
  ;

  products.forEach(function(product) {
    var
      props = getProductProperties(product)
    ;

    gulp.src(props.folder + '/*.json')
      .pipe(insert.append(',')) // add , to end of each of the files in the folder
      .pipe(concat(props.slug + '_options.json')) // combine all files into single options file
      .pipe(insert.prepend('{"' + props.slug + '":{ "commodity_desc": ["' + product + '"], "source_desc": ["CENSUS"], "year": ["2012"], ')) // wrap object with product name
      .pipe(insert.append('"agg_level_desc": ["NATIONAL", "STATE", "COUNTY"]}}')) // add item and end object
      .pipe(gulp.dest(props.folder)) // write to fs
      .pipe(jsonlint()) // ensure we created valid JSON object in file
      .pipe(jsonlint.reporter())
  });

});

gulp.task('product-combinations', function() {
  var
    products = getFilteredProductList()
  ;

  products.forEach(function(product) {
    var
      props        = getProductProperties(product),
      optionKeys   = ['commodity_desc', 'class_desc', 'unit_desc', 'statisticcat_desc', 'util_practice_desc', 'prodn_practice_desc', 'domain_desc', 'year', 'source_desc', 'agg_level_desc'],
      optionFile   = props.folder + '/' + props.slug + '_options.json',
      outputFile   = props.folder + '/' + props.slug + '_queries.json',
      optionsRaw   = fs.readFileSync(optionFile),
      optionsJSON  = JSON.parse(optionsRaw),
      optionArr    = [],
      optionCombos = null,
      optionURLs   = [],
      result   = {}
    ;

    optionKeys.forEach(function(option) {
      optionArr.push(
        getFilteredOptions(option, optionsJSON[props.slug][option])
      );
    });

    optionCombos = cartesian(optionArr);

    optionCombos.forEach(function(combo) {
      var
        filename  = productHelper.filenameFromOptions(combo),
        zipped    = R.zip(optionKeys, combo),
        encoded   = zipped.map(kv => [kv[0], urlencode(kv[1])]),
        qspair    = encoded.map(kv => kv.join('='))
        qsvars    = qspair.join('&')
      ;

      console.log(filename);

      optionURLs.push({
       filename:    filename,
       options:     zipped,
       querystring: qsvars
      });
    });

    result[props.slug] = {
      queries: optionURLs
    };

    fs.writeFileSync(outputFile, JSON.stringify(result));
  });

});

gulp.task('product-download', function(cb) {
  var
    products = getFilteredProductList()
  ;

  products.forEach(function(product) {
    var
      props       = getProductProperties(product),
      baseURL     = 'http://nass-api.azurewebsites.net/api/api_get?',
      queriesFile = props.folder + '/' + props.slug + '_queries.json',
      queriesRaw  = fs.readFileSync(queriesFile),
      queriesJSON = JSON.parse(queriesRaw)
      queries     = queriesJSON[props.slug]["queries"],
      promiselist = []
    ;

    queries.forEach(function(query) {
      promiselist.push(query);
    });

    promise.makePromises(promiselist, function () {
      if (cb) { cb(); }
    });

    queries.forEach(function(query) {
      var
        url      = baseURL + query.querystring,
        filename = query.filename + '.json'
      ;

      request(url)
        .on('response', function(response) {
          console.log(filename);
        })
        .on('error', function(err) {
          console.log("ERROR [" + filename + "]");
          console.log(err);
        })
        .pipe(source(filename))
        .pipe(insert.prepend('"' + query.filename + '": '))
        .pipe(insert.append(','))
        .pipe(gulp.dest(props.folder)) // write to fs
        .pipe(promise.deliverPromise(query))
      ;

    });

  });

});

gulp.task('product-clean', function() {
  var
    products = getFilteredProductList()
  ;

  products.forEach(function(product) {
    var
      props = getProductProperties(product)
    ;

    gulp.src(props.folder + '/*{national,state,county}.json')
      .pipe(concat(props.slug + '.json')) // combine all files into single options file
      .pipe(insert.prepend('{ "' + props.slug + '": {'))
      .pipe(insert.append('"ignore": {}}}'))
      .pipe(jsonTransform(function(fullJSON) {
        var
          slug        = props.slug,
          productJSON = fullJSON[slug],
          keys        = null,
          rollupKey   = null,
          output      = {}
        ;

        // remove the 'ignore' before getting keys
        delete productJSON['ignore'];
        keys = Object.keys(productJSON)

        rollupKey = keys[0].replace(/_(national|state|county)/gi, '');

        output[slug] = {};
        output[slug][rollupKey] = {};

        keys.forEach(function(key) {
          console.log(key);

          var
            data      = productJSON[key]['data'],
            units     = null
          ;

          if(!data) { return false; }

          units = data[0]['unit_desc'];

          output[slug][rollupKey]['units'] = {
            units: units
          };

          data.forEach(function(region) {
            var
              state_fips_code = region['state_fips_code'] || null,
              county_code     = region['county_code'] || null,
              fips            = productHelper.getFipsFromStateCounty(state_fips_code, county_code),
              value           = region['value'] || null,
              value_int       = parseInt(value.replace(/,/g, ''))
            ;

            // only record value if we've actually got a value
            if(value_int >= 0) {
              output[slug][rollupKey][fips] = value_int;
            }

          });
        });

        return output;
      }))
      .pipe(gulp.dest(PRODDIR)) // write to fs
      .pipe(jsonlint()) // ensure we created valid JSON object in file
      .pipe(jsonlint.reporter())

  });

});

gulp.task('products', gulpSequence('product-list', 'product-metadata', 'product-concat', 'product-combinations'));
