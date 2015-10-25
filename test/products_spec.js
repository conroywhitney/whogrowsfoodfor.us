import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import {productMeta, productKeys, productOptions, sectors} from '../src/products'
import {filterProducts, productFilter, filterOptions, filterOption} from '../src/product_helper';

describe('products', () => {

  var NUM_PRODUCTS = 145;

  describe('productMeta', () => {

    it('should be defined', () => {
      expect(productMeta).to.be.ok;
    });

  });

  describe('productKeys', () => {

    it('should be defined', () => {
      expect(productKeys).to.be.ok;
    });

    it('should be the right size', () => {
      expect(productKeys.length).to.eq(NUM_PRODUCTS);
    });

  });

  describe('productOptions', () => {

    it('should be defined', () => {
      expect(productOptions).to.be.ok;
    });

    it('should be of the form {value:value, label:label}', () => {
      var option = productOptions[0];
      expect(option.value).to.be.ok;
      expect(option.label).to.be.ok;
    });

  });

});

