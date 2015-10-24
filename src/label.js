import {Map, List, fromJS} from 'immutable';

import {DEFAULT_LABEL} from './constants';

export function getLabel(state) {
  if(!state) { return null; }

  var
    labels       = state.getIn(['data', 'labels']),
    fips         = state.get('selected'),
    product      = state.get('product'),
    regionLabel  = getRegionLabel(labels, fips),
    productLabel = getProductLabel(product)
  ;

  return `Map of ${productLabel}${regionLabel}`
}

function getRegionLabel(labels, fips) {
  return labels.getIn([fips, 'long']) || DEFAULT_LABEL;
}

function getProductLabel(product) {
  if(!product) { return ''; }
  return product.name + ' production in ';
}
