import {Map, List, toJS, fromJS} from 'immutable';
import {INITIAL_STATE} from './constants'
import {filterProducts, productFilter} from './product_helper'
import {getQueryLabel} from './label';

export const productMeta    = require('../data/meta/product_meta.json');
export const productData    = fromJS(require('../data/products.json').products);
export const productQueries = Object.keys(productData.toJS()).sort();
export const productOptions = productQueries
                                  .map(key => ({
                                    value: key,
                                    label: getQueryLabel(key)
                                  }));

export function getDataForQuery(query, fips) {
  if(!query) { return []; }
  var value = productData.getIn([query, fips]);
  console.log('products : get data for query', query, value);
  return value || [];
}
