import {Map, List, fromJS} from 'immutable';

import {DEFAULT_LABEL} from './constants';
import {normalizeFIPS} from './fips';

export const labelJSON = require('../data/labels.json');

export function getLabel(state) {
  if(!state) { return null; }

  var
    labels       = labelJSON,
    fips         = normalizeFIPS(state.get('selected')),
    product      = state.get('product'),
    regionLabel  = getRegionLabel(fips),
    productLabel = getProductLabel(product)
  ;

  return `${productLabel}${regionLabel}`
}

export function getRegionLabel(fips) {
  if(!fips) { return DEFAULT_LABEL; }
  return labelJSON[fips]['long'] || DEFAULT_LABEL;
}

export function getProductLabel(product) {
  if(!product) { return ''; }
  return product.name + ' production in ';
}
