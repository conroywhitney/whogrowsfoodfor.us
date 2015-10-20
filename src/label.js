import {Map, List, fromJS} from 'immutable';

import {DEFAULT_LABEL} from './constants';

export function getLabel(state, fips) {
  if(!state) { return null; }
  return state.getIn(['data', 'labels', fips, 'long']) || DEFAULT_LABEL;
}
