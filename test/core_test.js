import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {select} from '../src/core'
import {defaultLabel} from '../src/label'

describe('application logic', () => {

  const stateName    = 'Oregon';
  const stateFIPS    = '41000';
  const countyName   = 'Jackson County';
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
      label: defaultLabel,
      data: {
        names: require('../data/labels.json')
      }
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
      expect(initialState().get('label')).to.eq(defaultLabel);
      expect(initialState().get('label')).to.have.length.above(0);
    });

  });

  describe('select', () => {

    describe('state level', () => {

      var newState = select(initialState(), stateFIPS);

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

      var newState = select(initialState(), countyFIPS);

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

});
