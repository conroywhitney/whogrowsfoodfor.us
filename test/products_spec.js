import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import {productJSON, productList, productOptions, sectors, filterProducts, productFilter} from '../src/products'

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

  describe('filterProducts', () => {

    var
      desirable   = ['ASPARAGUS', 'EGGPLANT', 'SPINACH'],
      undesirable = ['RENT', 'INTEREST', 'FARM LOANS'],
      combined    = desirable.concat(undesirable)
    ;

    it('should return a blank array if null', () => {
      expect(filterProducts(null)).to.eql([]);
    });

    it('should return a blank array if blank array', () => {
      expect(filterProducts([])).to.eql([]);
    });

    it('should return the same object if not an array', () => {
      expect(filterProducts({test:'value'})).to.eql({test:'value'});
    });

    it('should return the same array if no undesirable words', () => {
      expect(filterProducts(desirable)).to.eql(desirable);
    });

    it('should return a filtered array if undesirable words', () => {
      expect(filterProducts(combined)).to.eql(desirable);
    });

    it('should return a blank array if all undesirable words', () => {
      expect(filterProducts(undesirable)).to.eql([]);
    });

  });

  describe('productFilter', () => {

    it('should keep desirable words', () => {
      expect(productFilter("SQUASH")).to.be.true;
    });

    it('should ignore undesirable words', () => {
      expect(productFilter("PIGEONS")).to.be.false;
    });

  });

});

