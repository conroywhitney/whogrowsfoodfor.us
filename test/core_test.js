import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

describe('application logic', () => {

  function initialState() {
    return fromJS({
      crop: null,
      stat: null,
      spotlight: null,
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

    it('should not have any region in the spotlight', () => {
      expect(initialState().get('spotlight')).to.be.null;
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

});
