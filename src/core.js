import {Map, List, fromJS} from 'immutable';

import {getStateFIPS, normalizeFIPS} from '../src/fips';
import {getZoomXYZ} from '../src/zoom';
import {productJSON} from '../src/products';

export function select(state, fips) {
  var
    fips = normalizeFIPS(fips)
  ;
  return state
    .set('selected', fips)
    .set('detail',   state.get('detail').push('counties'))
    .set('zoom',     getZoomXYZ(fips))
  ;
}

export function product(state, productKey) {
  var
    product = productJSON[productKey]
  ;
  return state
    .set('product', product)
  ;
};
