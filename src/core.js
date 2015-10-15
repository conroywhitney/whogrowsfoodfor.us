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
  if(someFIPS > 0) {
    return Math.floor(someFIPS / 1000) * 1000
  } else {
    return null;
  }
}

