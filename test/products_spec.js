import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import {productJSON, productList, productOptions, sectors} from '../src/products'
import {filterProducts, productFilter, filterOptions, filterOption} from '../src/product_helper';

describe('products', () => {

  const NUM_PRODUCTS = 174;

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


  describe('filterOptions', () => {

    var
      desirable = ["AREA","AREA BEARING","AREA HARVESTED","OPERATIONS","SALES"]
    ;

    describe('known option key', () => {

      var
        optionKey   = 'statisticcat_desc',
        undesirable = ["SALES FOR SLAUGHTER","TAPS","TREATED","WATER RECEIVED","WORKERS"],
        combined    = desirable.concat(undesirable)
      ;

      it('should return a blank array if null', () => {
        expect(filterOptions(optionKey, null)).to.eql([]);
      });

      it('should return a blank array if blank array', () => {
        expect(filterOptions(optionKey, [])).to.eql([]);
      });

      it('should return the same object if not an array', () => {
        expect(filterOptions(optionKey, {test:'value'})).to.eql({test:'value'});
      });

      it('should return the same array if no undesirable words', () => {
        expect(filterOptions(optionKey, desirable)).to.eql(desirable);
      });

      it('should return a filtered array if undesirable words', () => {
        expect(filterOptions(optionKey, combined)).to.eql(desirable);
      });

      it('should return a blank array if all undesirable words', () => {
        expect(filterOptions(optionKey, undesirable)).to.eql([]);
      });

    });

    describe('unknown option key', () => {

      it('should return the same array without filtering', () => {
        expect(filterOptions('fake_option_key', desirable)).to.eql(desirable);
      });

      it('should return the same array if null', () => {
        expect(filterOptions(null, desirable)).to.eql(desirable);
      });

    });

  });

  describe('filterOption', () => {

    describe('statisticcat_desc', () => {

      var
        optionKey = 'statisticcat_desc'
      ;

      it('should keep desirable options', () => {
        expect(filterOption(optionKey, "AREA BEARING")).to.be.true;
      });

      it('should ignore undesirable options', () => {
        expect(filterOption(optionKey, "WATER RECEIVED")).to.be.false;
      });

    });

    describe('unknown option key', () => {

      it('should return true so as not to filter', () => {
        expect(filterOption('fake_option_key', "AREA BEARING")).to.be.true;
      });

      it('should return true if null', () => {
        expect(filterOption(null, "AREA BEARING")).to.be.true;
      });

    });

  });

});

