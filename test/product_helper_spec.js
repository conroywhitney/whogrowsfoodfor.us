import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import {filterProducts, productFilter, filterOptions, filterOption, filenameFromOptions, filterOptionForFilename} from '../src/product_helper';

describe('product helper', () => {

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

  describe('filenameFromOptions', () => {

    var
      options = ["2012","CENSUS","NATIONAL","APPLES","ALL CLASSES","ACRES","AREA BEARING","ALL UTILIZATION PRACTICES","ALL PRODUCTION PRACTICES","TOTAL"],
      filename = filenameFromOptions(options)
    ;

    it('should omit _all_* values from filename', () => {
      expect(filename).to.not.contain('all');
    });

    it('should omit _total_ values from filename', () => {
      expect(filename).to.not.contain('total');
    });

    it('should omit _census_ from filename', () => {
      expect(filename).to.not.contain('census');
    });

    it('should omit _2012_ from filename', () => {
      expect(filename).to.not.contain('2012');
    });

  });

  describe('filterOptionForFilename', () => {

    it('should omit _all_* values from filename', () => {
      expect(filterOptionForFilename("ALL CLASSES")).to.be.false;
    });

    it('should omit _total_ values from filename', () => {
      expect(filterOptionForFilename("TOTAL")).to.be.false;
    });

    it('should omit _census_ from filename', () => {
      expect(filterOptionForFilename("CENSUS")).to.be.false;
    });

    it('should omit _2012_ from filename', () => {
      expect(filterOptionForFilename("2012")).to.be.false;
    });

    it('should keep good words', () => {
      expect(filterOptionForFilename("APPLES")).to.be.true;
    });

  });

});
