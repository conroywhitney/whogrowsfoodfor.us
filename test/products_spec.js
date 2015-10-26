import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import {productMeta, productOptions, sectors, getDataForQuery} from '../src/products'
import {filterProducts, productFilter, filterOptions, filterOption} from '../src/product_helper';

describe('products', () => {

  var NUM_PRODUCTS = 145;

  describe('productMeta', () => {

    it('should be defined', () => {
      expect(productMeta).to.be.ok;
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

    it('should be values we would actually want to use', () => {
      var
        query = 'blackberries_(incl_dewberries_and_marionberries)_acres_area_harvested',
        option = productOptions.filter(o => o.value == query)[0]
      ;

      expect(option.value).to.eq(query);
      expect(option.label).to.eq('Blackberries (Incl Dewberries and Marionberries)');
    });

  });

  describe('getDataForQuery', () => {

    it('should return empty array for null', () => {
      expect(getDataForQuery(null)).to.eql([]);
    });

    it('should return empty array for invalid product', () => {
      expect(getDataForQuery('invalid')).to.eql([]);
    });

    it('should return object with expected keys for valid product', () => {
      var
        query  = 'spinach_acres_area_harvested',
        result = getDataForQuery(query)
      ;

      expect(result).to.contain.keys('stats');
      expect(result).to.contain.keys('fips');
    });

  });

});

