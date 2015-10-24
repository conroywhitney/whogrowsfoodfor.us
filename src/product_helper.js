var
  slug       = require('slug'),
  deepExtend = require('deep-extend')
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

function getCleanKeys(dirtyJSON) {
  if(!dirtyJSON) { return []; }

  // remove the 'ignore' before getting keys
  delete dirtyJSON['ignore'];
  return Object.keys(dirtyJSON)
}

function getRollupKey(key) {
  if(!key) { return null; }
  return key.replace(/_(national|state|county)/gi, '')
}

function getCleanJSON(json) {
  if(!json) { return {}; }

  if(json['data']) {
    // if we see 'data', that means we are at a level deep enough to roll up
    return rollupProductArray(json['data']);
  } else {
    // otherwise, recursively go through keys until we reach that deep level

    var
      // clean keys so we don't end up with the ignore: {} that might be sent down
      keys = getCleanKeys(json),

      // what we'll return at the very end
      output = {}
    ;

    // these are like key_one_national, key_two_state, etc.
    keys.forEach(function(key) {
      var
        // find a logical grouping for these so combine national, state, county
        group = getRollupKey(key),

        // store values from this current iteration that we'll merge later into global output
        iteration = {}
      ;
      // recursively call for each key and store for this iteration by group key
      iteration[group] = getCleanJSON(json[key])

      // merge iteration into absolute output that we'll return at the end
      output = deepExtend(output, iteration);
    });
  }

  return output;
}

function rollupProductArray(arr) {
  var
    // logical structure that we'll return back up to our parent that called us
    output = {
      stats: {
        units:  arr[0]['unit_desc'],
        totals: {}
      },
      fips: {}
    }
  ;

  // go through each item in my array and simplify attributes into { fips: value }
  arr.forEach(function(item) {
    var
      state_fips_code = item['state_fips_code'] || null,
      county_code     = item['county_code'] || null,
      fips            = getFipsFromStateCounty(state_fips_code, county_code),
      fipsType        = getFipsType(fips),
      value           = item['value'] || null,
      value_int       = getIntFromCommaString(value)
    ;

    // only record value if we've actually got a value (not (D) or (Z))
    if(value_int >= 0) {
      output['fips'][fips] = value_int;
      // like ruby ||= except much uglier  :(
      // necessary so that 0 values don't trounce actual values when deep merge later
      output.stats.totals[getFipsType(fips)] = output.stats.totals[getFipsType(fips)] ? output.stats.totals[getFipsType(fips)] + value_int : value_int;
    }
  });

  // returning logical structure from above, but now with actual data!
  return output;
}

function getFipsType(fips) {
  if(isFipsNational(fips)) { return 'national'; }
  if(isFipsState(fips))    { return 'state';    }
  if(isFipsCounty(fips))   { return 'county';   }
  return null;
}

function isFipsNational(fips) {
  return (fips == '00000');
}

function isFipsState(fips) {
  return /\d{2}000/.test(fips) && !isFipsNational(fips);
}

function isFipsCounty(fips) {
  return /\d{5}/.test(fips) && !isFipsNational(fips) && !isFipsState(fips);
}

function getIntFromCommaString(value) {
  if(!value) { return null; }
  var
    value_str   = '' + value,
    value_clean = value_str.replace(/,/g, ''),
    value_int   = parseInt(value_clean)
  ;
  return value_int;
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

module.exports.getCleanJSON          = getCleanJSON;
module.exports.getRollupKey          = getRollupKey;
module.exports.getCleanKeys          = getCleanKeys;
module.exports.getIntFromCommaString = getIntFromCommaString;

module.exports.getFipsType    = getFipsType;
module.exports.isFipsNational = isFipsNational;
module.exports.isFipsState    = isFipsState;
module.exports.isFipsCounty   = isFipsCounty;

module.exports.getCleanJSON = getCleanJSON;
