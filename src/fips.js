export const FIPS_NATIONAL = '00000';

export function getStateFIPS(string) {
  // FIPS codes are in the thousands
  // Starting with Alabama at 01000
  // and ending with Puerto Rico at 72000
  // A specific county will be a subset, like 01024
  // So can find state by rounding to nearest 1,000
  // Note: notice the prepending 0 on there
  if(string > 0) {
    var
      fips_int    = parseInt(string),
      fips_floor  = Math.floor(fips_int / 1000) * 1000,
      fips_string = normalizeFIPS(fips_floor)
    ;
    return fips_string;
  } else {
    return null;
  }
}

export function normalizeFIPS(fips) {
  if(!fips) { return FIPS_NATIONAL; }

  var
    fips_int    = parseInt(fips),
    fips_string = null
  ;

  if(fips_int == 0 || fips_int == 99) {
    fips_string = FIPS_NATIONAL;
  } else if(fips_int > 0 && fips_int < 99) {
    fips_string = getFipsFromStateCounty(fips_int);
  } else if(fips_int >= 1000 && fips_int <= 99999) {
    fips_string = ("00000" + fips_int).slice(-5);
  }

  return fips_string;
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
