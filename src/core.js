import {Map, List, fromJS} from 'immutable';

import {getStateFIPS, normalizeFIPS} from '../src/fips';
import {getZoomXYZ} from '../src/zoom';
import {getLabel, DEFAULT_LABEL} from '../src/label';

export const INITIAL_STATE = fromJS({
  crop: null,
  stat: null,
  selected: null,
  zoom: null,
  detail: ['land', 'states'],
  histograms: [],
  label: DEFAULT_LABEL,
  data: {
    labels: require('../data/labels.json')
  }
});

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

