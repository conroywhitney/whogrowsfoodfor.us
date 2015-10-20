import {Map, List, fromJS} from 'immutable';

export function setProduct(product) {
  return {
    type:   'PRODUCT',
    product: product
  }
}

export function setRegion(fips) {
  return {
    type: 'SELECT',
    fips: fips
  }
}
