import {getStateFIPS, normalizeFIPS} from '../src/fips';
import {getZoomXYZ} from '../src/zoom';

export function select(state, fips) {
  var
    fips = normalizeFIPS(fips)
  ;
  return state
    .set('selected', fips)
    .set('detail',   state.get('detail').push('counties'))
    .set('zoom',     getZoomXYZ(fips))
    .set('label',    getLabel(fips))
  ;
}

function getLabel(fips) {
  if(!fips) { return "United States" }
}
