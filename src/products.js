import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE} from './constants'
import {filterProducts, productFilter} from './product_helper'

export const productJSON = INITIAL_STATE.getIn(['data', 'products']).toJS();

export const rawProductList   = INITIAL_STATE.getIn(['data', 'raw', 'productList']).toJS()["data"][0]["Values"];

export const filteredProducts = filterProducts(rawProductList);
export const productList      = Object.keys(filteredProducts);
export const productOptions   = productList.map(p =>
                                  ({value: p, label: p})
                                );


