import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import {INITIAL_STATE, DEFAULT_LABEL} from '../src/constants';
import {select, product} from '../src/core';
import {getLabel, getProductLabel, getQueryLabel} from '../src/label';
import {productKeys} from '../src/products';

describe('label', () => {

	describe('defaults', () => {

    it('should have default label by default', () => {
      expect(getLabel(INITIAL_STATE)).to.eq('The United States of America');
    });

    it('should return null if given no state', () => {
      expect(getLabel(null, '000000')).to.be.null;
    });

  });

  describe('when have a region', () => {

    it('should set a state-related label', () => {
      var
        stateFIPS = '41000',
        stateName = 'Oregon',
        newState  = select(INITIAL_STATE, stateFIPS)
      ;
      expect(getLabel(newState)).to.eq(stateName);
    });

    it('should set a county-related label', () => {
      var
        countyFIPS = '41029',
        countyName = 'Jackson County, OR',
        newState   = select(INITIAL_STATE, countyFIPS)
      ;
      expect(getLabel(newState)).to.eq(countyName);
    });

  });

  describe('when have a product', () => {

    it('should set the product name in the label', () => {
      var
        productKey  = 'corn',
        productName = 'Corn',
        newState    = product(INITIAL_STATE, 'corn')
      ;
      expect(getLabel(newState)).to.eq(`${productName} - ${DEFAULT_LABEL}`);
    });

  });

  describe('when have both a product and a region', () => {

    it('should include both product and region', () => {
      var
        productKey  = 'corn',
        productName = 'Corn',
        regionFIPS  = '41029',
        regionName  = 'Jackson County, OR',
        newState    = product(INITIAL_STATE, productKey),
        newState    = select(newState, regionFIPS)
      ;
      expect(getLabel(newState)).to.eq(`${productName} - ${regionName}`);
    });

  });

  describe('getQueryLabel', () => {

    it('should return blank if null value', () => {
      expect(getQueryLabel(null)).to.be.null;
    });

    it('should return blank if unknown value', () => {
      expect(getQueryLabel(null)).to.be.null;
    });

    it('should handle area harvested', () => {
      expect(getQueryLabel('barley_acres_area_harvested')).to.eq('Barley');
    });

    it('should handle keys with classes in parens', () => {
      expect(getQueryLabel('lettuce_(romaine)_acres_area_harvested')).to.eq('Lettuce (Romaine)');
    });

    it('should handle queries by head', () => {
      expect(getQueryLabel('hogs_head_sales')).to.eq('Hogs');
    });

    it('should handle "excl" queries', () => {
      expect(getQueryLabel('beans_(dry_edible_excl_lima)_acres_area_harvested')).to.eq('Beans (Dry Edible Excl Lima)');
    });

    it('should handle an area bearing query', () => {
      expect(getQueryLabel('coffee_acres_area_bearing')).to.eq('Coffee');
    });

  });

});
