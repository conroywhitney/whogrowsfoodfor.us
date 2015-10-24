import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {getStateFIPS, normalizeFIPS} from '../src/fips'

describe('fips', () => {

  const stateFIPS    = '41000';
  const countyFIPS   = '41029';

  describe('getStateFIPS', () => {

    it('should return null if given nothing', () => {
      expect(getStateFIPS(null)).to.be.null;
    });

    it('should return null if given invalid FIPS', () => {
      expect(getStateFIPS(0)).to.be.null;
    });

    it('should return the same FIPS if it is a state', () => {
      expect(getStateFIPS(stateFIPS)).to.eq(stateFIPS);
    });

    it('should return the state FIPS if it is a county', () => {
      expect(getStateFIPS(countyFIPS)).to.eq(stateFIPS);
    });

    it('should balk at too many digits', () => {
      expect(getStateFIPS(100000)).to.eq(null);
    });

  });

  describe('normalizeFIPS', () => {

    it('should handle null case', () => {
      expect(normalizeFIPS(null)).to.be.null;
    });

    it('should return null for negative numbers', () => {
      expect(normalizeFIPS(-1)).to.be.null;
    });

    it('should handle all zero case', () => {
      expect(normalizeFIPS(0)).to.eq('00000');
    });

    it('should handle one digit', () => {
      expect(normalizeFIPS(1)).to.eq('00001');
    });

    it('should handle two digits', () => {
      expect(normalizeFIPS(10)).to.eq('00010');
    });

    it('should handle three digits', () => {
      expect(normalizeFIPS(100)).to.eq('00100');
    });

    it('should handle four digits', () => {
      expect(normalizeFIPS(1000)).to.eq('01000');
    });

    it('should handle five digits', () => {
      expect(normalizeFIPS(10000)).to.eq('10000');
    });

    it('should balk at six digits', () => {
      expect(normalizeFIPS(100000)).to.eq(null);
    });

    it('should return back the same county FIPS code', () => {
      var countyFIPS = '41029';
      expect(normalizeFIPS(countyFIPS)).to.eq(countyFIPS);
    });

  });

});
