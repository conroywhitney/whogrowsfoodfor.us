import {Map, List, fromJS} from 'immutable';
import {toTitleCase} from 'titlecase';

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
    productLabel = getQueryLabel(product),
    label        = '';
  ;

  if(productLabel) { label += `${productLabel} - `; }
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

export function getQueryLabel(query) {
  if(!query) { return null; }

  var
  splits  = query.split(/_(acres|head)/gi),
  product = splits[0]
              .replace(/_/gi, ' ')
  ;

  return toTitleCase(product);
}
