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
    .set('label',    getLabel(state.get('data'), fips))
  ;
}

function getLabel(data, fips) {
  var
    county = data.getIn(['counties', fips])
  ;
  if(fips && county) { return county }
  return "United States";
}
