import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE} from './constants'
import {filterProducts, productFilter} from './product_helper'
import {getProductLabel} from './label';

export const productMeta    = require('../data/meta/product_meta.json');
export const productKeys    = require('../data/meta/product_keys.json').keys;
export const productData    = require('../data/products.json').products;
export const productOptions = productKeys
                                  .map(key => ({
                                    value: key,
                                    label: getProductLabel(key)
                                  }))

