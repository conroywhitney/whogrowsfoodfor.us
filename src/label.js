import {Map, List, fromJS} from 'immutable';

import {DEFAULT_LABEL} from './constants';
import {normalizeFIPS} from './fips';
import {productMeta} from './products';

export const labelJSON = require('../data/meta/geo_labels.json');

export function getLabel(state) {
  if(!state) { return null; }

  var
    labels       = labelJSON,
    fips         = normalizeFIPS(state.get('selected')),
    product      = state.get('product'),
    regionLabel  = getRegionLabel(fips),
    productLabel = getProductLabel(product),
    label        = '';
  ;

  if(productLabel) { label += `${productLabel} production in `; }
  if(regionLabel)  { label += regionLabel; }

  return label;
}

export function getRegionLabel(fips) {
  if(!fips) { return DEFAULT_LABEL; }
  return labelJSON[fips]['long'] || DEFAULT_LABEL;
}

export function getProductLabel(productKey) {
  if(!productKey) { return ''; }

  var
    product = productMeta[productKey],
    label   = product ? product.name : '';
  ;

  return label;
}
