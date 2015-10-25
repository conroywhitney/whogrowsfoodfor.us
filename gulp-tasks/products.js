var
  gulp          = require('gulp-param')(require('gulp'), process.argv),
  gulpSequence  = require('gulp-sequence'),
  fs            = require('fs'),
  fileExists    = require('file-exists'),
  download      = require('gulp-download'),
  request       = require('request'),
  replace       = require('gulp-replace'),
  source        = require('vinyl-source-stream'),
  streamify     = require('streamify'),
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
  using         = require("gulp-using"),
  $size         = require("gulp-size"),
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

gulp.task('product-metadata', function(cb) {
  var
    products    = getFilteredProductList()
  ;

  products.forEach(function(product) {
    var
      props = getProductProperties(product)
    ;

    OPTIONS.forEach(function(option) {
      var
        url      = 'http://nass-api.azurewebsites.net/api/get_dependent_param_values?source_desc=CENSUS&year=2012&freq_desc=ANNUAL&agg_level_desc=COUNTY&distinctParams=' + option + '&commodity_desc=' + props.qsVar,
        filename = getOptionFilename(props.slug, option),
        filepath = props.folder + '/' + filename
      ;

      if(fileExists(filepath)) {
        // skip
      } else {
        download(url)
          .pipe(jeditor(function(json) { // get meat and potatoes of JSON object
            if(!json || !json["data"]) { return []; }
            return json["data"][0]["Values"];
          }))
          .pipe(insert.prepend('"' + option + '":')) // add option name before value array
          .pipe(rename(filename)) // set filename
          .pipe(gulp.dest(props.folder)) // write to fs
      }

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
        zipped    = R.zip(optionKeys, combo),
        filename  = productHelper.filenameFromOptions(zipped),
        encoded   = zipped.map(kv => [kv[0], urlencode(kv[1])]),
        qspair    = encoded.map(kv => kv.join('='))
        qsvars    = qspair.join('&')
      ;

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
        filename = query.filename + '.json',
        filepath = props.folder + '/' + filename
      ;

      if(fileExists(filepath)) {
        // skip
      } else {
        request(url, {timeout: 120000})
          .on('response', function(response) {
            console.log(filename);
          })
          .on('error', function(err) {
            console.log("ERROR [" + err.code + "]", "Please run script again", query.filename);
          })
          .pipe(source(filename))
          .pipe(insert.prepend('"' + query.filename + '": '))
          .pipe(insert.append(','))
          .pipe(gulp.dest(props.folder)) // write to fs
          .pipe(promise.deliverPromise(query))
        ;
      }

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
      .pipe(jsonTransform(function(dirtyJSON) {
        return productHelper.getCleanJSON(dirtyJSON);
      }))
      .pipe(gulp.dest(PRODDIR)) // write to fs
      .pipe(jsonlint()) // ensure we created valid JSON object in file
      .pipe(jsonlint.reporter())

  });

});

gulp.task('product-sanity-check', function() {
  gulp.src(PRODDIR + '*')
      .pipe(jsonTransform(function(json) {
        var
          product = Object.keys(json)[0],
          data    = json[product],
          keys    = Object.keys(data)
        ;

        keys.forEach(function(key) {
          var
            item     = data[key],
            stats    = item.stats
          ;

          if(stats) {
            var
              totals   = stats.totals,
              national = (totals.national || -1).toLocaleString(),
              state    = (totals.state || -1).toLocaleString(),
              county   = (totals.county || -1).toLocaleString()
            ;
            console.log(product + " => " + key + " => ( " + national + ' / ' + state + ' / ' + county + ' )');
          } else {
            console.log(product + " => " + key + " => ( no information available )");
          }
        });
        return json;
      }))
      .pipe(jsonlint()) // ensure we created valid JSON object in file
      .pipe(jsonlint.reporter())
  ;
});

gulp.task('product-combine-all', function() {
  gulp.src(PRODDIR + '*')
      .pipe(insert.append(','))
      .pipe(concat('all_products.json')) // combine all files into single options file
      .pipe(insert.prepend('{ "products": ['))
      .pipe(insert.append(' {"ignore": {}} ] }'))
      .pipe(gulp.dest(DATADIR))
      .pipe(jsonlint())
      .pipe(jsonlint.reporter())
  ;
});

gulp.task('products', gulpSequence('product-list', 'product-metadata', 'product-concat', 'product-combinations'));
