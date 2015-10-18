import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {select, INITIAL_STATE} from '../src/core'
import {topoJSON, land, states, counties} from '../src/geography'

describe('geography', () => {

  describe('topoJSON', () => {

    it('should be defined', () => {
      expect(topoJSON).to.be.ok;
    });

  });

  describe('land', () => {

    it('should be defined', () => {
      expect(land).to.be.ok;
    });

  });

  describe('states', () => {

    it('should be defined', () => {
      expect(states).to.be.ok;
    });

  });

  describe('counties', () => {

    it('should be defined', () => {
      expect(counties).to.be.ok;
    });

  });

});
