import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';
import {select, getZoomXYZ, getZoomFIPS} from '../src/core'

describe('application logic', () => {

  const countyFIPS   = 41029;
  const stateFIPS    = 41000;
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

  });

});
