import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE} from './constants'

export const productJSON = INITIAL_STATE.getIn(['data', 'products']).toJS();

export const productList = Object.keys(productJSON);

export const productOptions = productList.map(p =>
                                ({value: p, label: productJSON[p].name})
                              );

