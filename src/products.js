import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE} from './constants'

export const productJSON = INITIAL_STATE.getIn(['data', 'products']).toJS();

export const rawProductList   = INITIAL_STATE.getIn(['data', 'raw', 'productList']).toJS()["data"][0]["Values"];

export const filteredProducts = filterProducts(rawProductList);
export const productList      = Object.keys(filteredProducts);
export const productOptions   = productList.map(p =>
                                  ({value: p, label: p})
                                );

export function filterProducts(arr) {
  // return blank object if null or empty array
  if(!arr || arr.length == 0) { return [] };

  // return same object if not an array
  if(!Array.isArray(arr)) { return arr; }

  return arr.filter(productFilter);
}

export function productFilter(product) {
  var
    regex  = new RegExp('OTHER|TOTALS|REPAIRS|INTERNET|AREA|HYBRIDS|TAXES|OPERATIONS|LABOR|FARM|LAND|SPAWN|FACILITY|SOD|LOANS|ENERGY|INTEREST|PRINCIPAL|DEPRECIATION|OPERATORS|SERVICES|PROGRAMS|PRACTICES|RENT|FUELS|ORNAMENTAL FISH|TREES & SHORT|FEED|HAYLAGE|PIGEONS|TEMPLES', 'gi'),
    ignore = regex.test(product),
    keep   = (ignore == false)
  ;
  return keep;
}
