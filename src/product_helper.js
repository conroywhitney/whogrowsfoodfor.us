var
  slug = require('slug')
;

function filterProducts(arr) {
  // return blank object if null or empty array
  if(!arr || arr.length == 0) { return [] };

  // return same object if not an array
  if(!Array.isArray(arr)) { return arr; }

  return arr.filter(productFilter);
}

function productFilter(product) {
  var
    regex  = new RegExp('OTHER|TOTALS|REPAIRS|INTERNET|AREA|HYBRIDS|TAXES|OPERATIONS|LABOR|FARM|LAND|SPAWN|FACILITY|SOD|LOANS|ENERGY|INTEREST|PRINCIPAL|DEPRECIATION|OPERATORS|SERVICES|PROGRAMS|PRACTICES|RENT|FUELS|ORNAMENTAL FISH|TREES & SHORT|FEED|HAYLAGE|PIGEONS|TEMPLES', 'gi'),
    ignore = regex.test(product),
    keep   = (ignore == false)
  ;
  return keep;
}

function filterOptions(option, arr) {
  // return blank object if null or empty array
  if(!arr || arr.length == 0) { return [] };

  // return same object if not an array
  if(!Array.isArray(arr)) { return arr; }

  return arr.filter(function(value) {
    return filterOption(option, value);
  });
}

function filterOption(option, value) {
  var
    filters = {
      "statisticcat_desc":   [ "AREA","AREA BEARING","AREA HARVESTED","OPERATIONS","SALES" ],
      "util_practice_desc":  [ "ALL UTILIZATION PRACTICES"/*, "RETAIL, COMMUNITY SUPPORTED AG"*/ ],
      "prodn_practice_desc": [ "ALL PRODUCTION PRACTICES"/*,"ORGANIC","ORGANIC, TRANSITIONING"*/ ],
      "unit_desc":           [ "$", "ACRES", "TONS", "LB", "BU", "HEAD", "TREES", "OPERATIONS" ],
      "domain_desc":         [ "TOTAL","AREA HARVESTED","AREA BEARING & NON-BEARING","AREA HARVESTED, FRESH MARKET & PROCESSING","SALES" ]
    },
    filter = filters[option],
    keep  = !option || !filter || (filter.indexOf(value) > -1)
  ;

  return keep;
}

function filenameFromOptions(options) {
  var
    filtered = options.filter(filterOptionForFilename),
    filename = filtered.map(v => slug(v.toLowerCase(), '_')).join('_')
  ;
  return filename;
}

function filterOptionForFilename(option) {
  var
    regex  = new RegExp('^(ALL|TOTAL|CENSUS|2012)', 'gi'),
    ignore = regex.test(option),
    keep   = (ignore == false)
  ;
  return keep;
}

// old skewl way of exporting
// wish I could use ES6 with gulp
// I'm sure there's a way ...

module.exports.filterProducts = filterProducts;
module.exports.productFilter  = productFilter;

module.exports.filterOptions = filterOptions;
module.exports.filterOption  = filterOption;

module.exports.filenameFromOptions = filenameFromOptions;
module.exports.filterOptionForFilename = filterOptionForFilename;
