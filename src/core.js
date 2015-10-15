import {List} from 'immutable';

export function select(state, fips) {
  return state
    .set('selected', fips)
    .set('detail',   state.get('detail').push('counties'))
    .set('zoom',     getZoomXYZ(getZoomFIPS(fips)))
  ;
}

export function getZoomXYZ(zoomFIPS) {
  if(!zoomFIPS) { return null; }
  // TODO: once have UI, find out boundary coordinates of path for FIPS
  return List([1, 2, 3]);
}

export function getZoomFIPS(someFIPS) {
  // FIPS codes are in the thousands
  // Starting with Alabama at 01000
  // and ending with Puerto Rico at 72000
  // A specific county will be a subset, like 01024
  // So can find state by rounding to nearest 1,000
  // Note: notice the prepending 0 on there
  if(someFIPS > 0) {
    var
      fips_int    = parseInt(someFIPS),
      fips_floor  = Math.floor(someFIPS / 1000) * 1000,
      fips_string = getPaddedFIPS(fips_floor)
    ;
    return fips_string;
  } else {
    return null;
  }
}

export function getPaddedFIPS(number) {
  if(number !== null && number >= 0 && number <= 99999) {
    return ("00000" + number).slice(-5);
  } else {
    return null;
  }
}
