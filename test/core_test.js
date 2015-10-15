import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';
import {select, getZoomXYZ, getZoomFIPS, getPaddedFIPS} from '../src/core'

describe('application logic', () => {

  const stateFIPS    = '41000';
  const countyFIPS   = '41029';
  const stateZoomXYZ = List([1, 2, 3]);

  function initialState() {
    return fromJS({
      crop: null,
      stat: null,
      selected: null,
      zoom: null,
      detail: ['land', 'states'],
      histograms: [],
      label: "Through the Eyes of Agriculture in the United States of America"
    });
  }

  describe('defaults', () => {

    it('should not have any crops selected', () => {
      expect(initialState().get('crop')).to.be.null;
    });

    it('should not have any stat selected', () => {
      expect(initialState().get('stat')).to.be.null;
    });

    it('should not have any selected region', () => {
      expect(initialState().get('selected')).to.be.null;
    });

    it('should draw country and state boundaries', () => {
      expect(initialState().get('detail')).to.eq(List(['land', 'states']));
    });

    it('should not have any histograms', () => {
      expect(initialState().get('histograms')).to.be.empty;
    });

    it('should have a generic label', () => {
      expect(initialState().get('label')).to.eq("Through the Eyes of Agriculture in the United States of America");
    });

  });

  describe('select', () => {

    it('should set the id of the selected region', () => {
      expect(select(initialState(), countyFIPS).get('selected')).to.eq(countyFIPS);
    });

    it('should draw county borders', () => {
      expect(select(initialState(), countyFIPS)
             .get('detail')).to.eq(List(['land', 'states', 'counties']));
    });

    it('should set zoom to XYZ of state', () => {
      expect(select(initialState(), countyFIPS)
             .get('zoom')).to.eq(stateZoomXYZ);

    });

  });

  describe('getZoomXYZ', () => {

    it('should return null if given nothing', () => {
      expect(getZoomXYZ(null)).to.be.null;
    });

  });

  describe('getZoomFIPS', () => {

    it('should return null if given nothing', () => {
      expect(getZoomFIPS(null)).to.be.null;
    });

    it('should return null if given invalid FIPS', () => {
      expect(getZoomFIPS(0)).to.be.null;
    });

    it('should return the same FIPS if it is a state', () => {
      expect(getZoomFIPS(stateFIPS)).to.eq(stateFIPS);
    });

    it('should return the state FIPS if it is a county', () => {
      expect(getZoomFIPS(countyFIPS)).to.eq(stateFIPS);
    });

    it('should balk at too many digits', () => {
      expect(getZoomFIPS(100000)).to.eq(null);
    });

  });

  describe('getPaddedFIPS', () => {

    it('should handle null case', () => {
      expect(getPaddedFIPS(null)).to.be.null;
    });

    it('should return null for negative numbers', () => {
      expect(getPaddedFIPS(-1)).to.be.null;
    });

    it('should handle all zero case', () => {
      expect(getPaddedFIPS(0)).to.eq('00000');
    });

    it('should handle one digit', () => {
      expect(getPaddedFIPS(1)).to.eq('00001');
    });

    it('should handle two digits', () => {
      expect(getPaddedFIPS(10)).to.eq('00010');
    });

    it('should handle three digits', () => {
      expect(getPaddedFIPS(100)).to.eq('00100');
    });

    it('should handle four digits', () => {
      expect(getPaddedFIPS(1000)).to.eq('01000');
    });

    it('should handle five digits', () => {
      expect(getPaddedFIPS(10000)).to.eq('10000');
    });

    it('should balk at six digits', () => {
      expect(getPaddedFIPS(100000)).to.eq(null);
    });

  });

});
