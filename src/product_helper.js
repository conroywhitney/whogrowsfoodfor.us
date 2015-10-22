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
    regex  = new RegExp('OTHER|TOTALS|REPAIRS|INTERNET|AREA|HYBRIDS|TAXES|OPERATIONS|LABOR|FARM|LAND|SPAWN|FACILITY|SOD|LOANS|ENERGY|INTEREST|PRINCIPAL|DEPRECIATION|OPERATORS|SERVICES|PROGRAMS|PRACTICES|RENT|FUELS|ORNAMENTAL FISH|TREES & SHORT|FEED|HAYLAGE|PIGEONS|TEMPLES|TRANSPLANTS|HONEY|EQUINE', 'gi'),
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
      "statisticcat_desc":   [ "AREA","AREA BEARING","AREA HARVESTED",/*"OPERATIONS"*/,"SALES" ],
      "util_practice_desc":  [ "ALL UTILIZATION PRACTICES"/*, "RETAIL, COMMUNITY SUPPORTED AG"*/ ],
      "prodn_practice_desc": [ "ALL PRODUCTION PRACTICES"/*,"ORGANIC","ORGANIC, TRANSITIONING"*/ ],
      "unit_desc":           [ "ACRES", /*"TONS", "LB", "BU",*/ "HEAD", /*"TREES",*/ /*"OPERATIONS"*/ ],
      "domain_desc":         [ "TOTAL",/*"AREA HARVESTED","AREA BEARING & NON-BEARING","AREA HARVESTED, FRESH MARKET & PROCESSING","SALES"*/ ]
    },
    filter = filters[option],
    keep  = !option || !filter || (filter.indexOf(value) > -1)
  ;

  return keep;
}

function filenameFromOptions(options) {
  var
    filtered = options.filter(filterOptionValueForFilename),
    filename = filtered.map(v => slug(v.toLowerCase(), '_')).join('_')
  ;
  return filename;
}

function filterOptionValueForFilename(value) {
  var
    regex  = new RegExp('^(ALL|TOTAL|CENSUS|2012)', 'gi'),
    ignore = regex.test(value),
    keep   = (ignore == false)
  ;
  return keep;
}

function getFipsFromStateCounty(state, county) {
  if(!state) { return null; }

  var
    state_int  = parseInt(state),
    county_int = parseInt(county),
    fips       = '';
  ;

  // national level
  if(state_int == 99) {
    fips = '00000';
  } else {

    if(state_int >= 10) {
      fips += state_int;
    } else {
      // left pad state fips
      fips += '0' + state_int;
    }

    if(county_int >= 0) {
      // left pad county fips
      fips += ("000" + county_int).slice(-3);
    } else {
      // right pad to indicate no county (state-level)
      fips += "000";
    }
  }

  return fips;
}

function getCleanJSON(dirtyJSON, props) {
  var
    slug        = props.slug,
    productJSON = dirtyJSON[slug],
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
        fips            = getFipsFromStateCounty(state_fips_code, county_code),
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
}
// old skewl way of exporting
// wish I could use ES6 with gulp
// I'm sure there's a way ...

module.exports.filterProducts = filterProducts;
module.exports.productFilter  = productFilter;

module.exports.filterOptions = filterOptions;
module.exports.filterOption  = filterOption;

module.exports.filenameFromOptions = filenameFromOptions;
module.exports.filterOptionValueForFilename = filterOptionValueForFilename;

module.exports.getFipsFromStateCounty = getFipsFromStateCounty;

module.exports.getCleanJSON = getCleanJSON;
