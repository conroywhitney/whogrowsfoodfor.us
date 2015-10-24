import {Map, List, fromJS} from 'immutable';

import {DEFAULT_LABEL} from './constants';
import {getStateFIPS} from './fips';

export const labelJSON = require('../data/labels.json');

export function getLabel(state) {
  if(!state) { return null; }

  var
    labels       = labelJSON,
    fips         = getStateFIPS(state.get('selected')),
    product      = state.get('product'),
    regionLabel  = getRegionLabel(labels, fips),
    productLabel = getProductLabel(product)
  ;

  return `Map of ${productLabel}${regionLabel}`
}

function getRegionLabel(labels, fips) {
  if(!fips) { return DEFAULT_LABEL; }
  return labels[fips]['long'] || DEFAULT_LABEL;
}

function getProductLabel(product) {
  if(!product) { return ''; }
  return product.name + ' production in ';
}
