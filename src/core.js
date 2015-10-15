import {parseFIPS} from '../src/fips';
import {getZoomXYZ} from '../src/zoom';

export function select(state, fips) {
  return state
    .set('selected', fips)
    .set('detail',   state.get('detail').push('counties'))
    .set('zoom',     getZoomXYZ(parseFIPS(fips)))
  ;
}




