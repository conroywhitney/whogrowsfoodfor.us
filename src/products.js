import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE} from './constants'
import {filterProducts, productFilter} from './product_helper'

export const productJSON = require('../data/products.json');

export const rawProductList   = require('../data/raw/product-list.json')["data"][0]["Values"];

export const filteredProducts = filterProducts(rawProductList);
export const productList      = Object.keys(filteredProducts);
export const productOptions   = productList.map(p =>
                                  ({value: p, label: p})
                                );


