import {getStateFIPS, normalizeFIPS} from '../src/fips';
import {getZoomXYZ} from '../src/zoom';
import {getLabel} from '../src/label';

export function select(state, fips) {
  var
    fips = normalizeFIPS(fips)
  ;
  return state
    .set('selected', fips)
    .set('detail',   state.get('detail').push('counties'))
    .set('zoom',     getZoomXYZ(fips))
    .set('label',    getLabel(state, fips))
  ;
}

