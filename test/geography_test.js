import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import {topoJSON, landTopoJSON, stateTopoJSON, countyTopoJSON} from '../src/geography';

describe('geography', () => {

  describe('topoJSON', () => {

    it('should be defined', () => {
      expect(topoJSON).to.be.ok;
    });

  });

  describe('landTopoJSON', () => {

    it('should be defined', () => {
      expect(landTopoJSON).to.be.ok;
    });

  });

  describe('stateTopoJSON', () => {

    it('should be defined', () => {
      expect(stateTopoJSON).to.be.ok;
    });

  });

  describe('countyTopoJSON', () => {

    it('should be defined', () => {
      expect(countyTopoJSON).to.be.ok;
    });

  });

});
