import {List} from 'immutable';

export function select(state, fips) {
  return state
    .set('selected', fips)
    .set('detail',   state.get('detail').push('counties'))
    .set('zoom',     getZoomXYZ(getStateFIPS(fips)))
  ;
}

export function getZoomXYZ(stateFIPS) {
  if(!stateFIPS) { return null; }
  return List([1, 2, 3]);
}

function getStateFIPS(someFIPS) {
  return someFIPS;
}
