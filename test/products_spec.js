import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {select, INITIAL_STATE} from '../src/core'
import {productJSON, productList, productOptions, sectors} from '../src/products'

describe('products', () => {

  const NUM_PRODUCTS = 184;

  describe('productJSON', () => {

    it('should be defined', () => {
      expect(productJSON).to.be.ok;
    });

  });

  describe('productList', () => {

    it('should be defined', () => {
      expect(productList).to.be.ok;
    });

    it('should be the right size', () => {
      expect(productList.length).to.eq(NUM_PRODUCTS);
    });

  });

  describe('productOptions', () => {

    it('should be defined', () => {
      expect(productOptions).to.be.ok;
    });

    it('should have the same number of options', () => {
      expect(productOptions.length).to.eq(NUM_PRODUCTS);
    });

  });

});

