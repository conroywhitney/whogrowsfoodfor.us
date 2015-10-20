import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {INITIAL_STATE, DEFAULT_LABEL} from '../src/constants';
import {select, product} from '../src/core';

describe('application logic', () => {

  const stateName    = 'Oregon';
  const stateFIPS    = '41000';
  const countyName   = 'Jackson County, OR';
  const countyFIPS   = '41029';
  const stateZoomXYZ = List([1, 2, 3]);

  describe('defaults', () => {

    it('should not have any product selected', () => {
      expect(INITIAL_STATE.get('product')).to.be.null;
    });

    it('should not have any stat selected', () => {
      expect(INITIAL_STATE.get('stat')).to.be.null;
    });

    it('should not have any selected region', () => {
      expect(INITIAL_STATE.get('selected')).to.be.null;
    });

    it('should draw country and state boundaries', () => {
      expect(INITIAL_STATE.get('detail')).to.eq(List(['land', 'states']));
    });

    it('should not have any histograms', () => {
      expect(INITIAL_STATE.get('histograms')).to.be.empty;
    });

    it('should have a generic label', () => {
      expect(INITIAL_STATE.get('label')).to.eq(DEFAULT_LABEL);
      expect(INITIAL_STATE.get('label')).to.have.length.above(0);
    });

  });

  describe('select', () => {

    describe('state level', () => {

      var newState = select(INITIAL_STATE, stateFIPS);

      it('should set the id of the selected region', () => {
        expect(newState.get('selected')).to.eq(stateFIPS);
      });

      it('should draw county borders', () => {
        expect(newState.get('detail')).to.eq(List(['land', 'states', 'counties']));
      });

      it('should set zoom to XYZ of state', () => {
        expect(newState.get('zoom')).to.eq(stateZoomXYZ);
      });

      it('should set a state-related label', () => {
        expect(newState.get('label')).to.eq(stateName);
      });

    });

    describe('county level', () => {

      var newState = select(INITIAL_STATE, countyFIPS);

      it('should set the id of the selected region', () => {
        expect(newState.get('selected')).to.eq(countyFIPS);
      });

      it('should draw county borders', () => {
        expect(newState.get('detail')).to.eq(List(['land', 'states', 'counties']));
      });

      it('should set zoom to XYZ of state', () => {
        expect(newState.get('zoom')).to.eq(stateZoomXYZ);

      });

      it('should set a county-related label', () => {
        expect(newState.get('label')).to.eq(countyName);
      });

    });

  });

  describe('product', () => {

    var
      productKey = "spinach",
      productName = "Spinach",
      newState = product(INITIAL_STATE, productKey)
    ;

    it('should have a product', () => {
      expect(newState.get('product')).to.be.ok;
    });

    it('should have the right product', () => {
      expect(newState.get('product').name).to.eq(productName);
    });

  });

});
