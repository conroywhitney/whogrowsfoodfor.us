import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE} from './constants'
import {filterProducts, productFilter} from './product_helper'
import {getQueryLabel} from './label';

export const productMeta    = require('../data/meta/product_meta.json');
export const productData    = require('../data/products.json').products;
export const productQueries = Object.keys(productData).sort();
export const productOptions = productQueries
                                  .map(key => ({
                                    value: key,
                                    label: getQueryLabel(key)
                                  }));

export function getDataForQuery(query) {
  if(!query) { return []; }
  return productData[query] || [];
}
