import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {parseFIPS, getPaddedFIPS} from '../src/fips'

describe('fips', () => {

  const stateFIPS    = '41000';
  const countyFIPS   = '41029';

  describe('parseFIPS', () => {

    it('should return null if given nothing', () => {
      expect(parseFIPS(null)).to.be.null;
    });

    it('should return null if given invalid FIPS', () => {
      expect(parseFIPS(0)).to.be.null;
    });

    it('should return the same FIPS if it is a state', () => {
      expect(parseFIPS(stateFIPS)).to.eq(stateFIPS);
    });

    it('should return the state FIPS if it is a county', () => {
      expect(parseFIPS(countyFIPS)).to.eq(stateFIPS);
    });

    it('should balk at too many digits', () => {
      expect(parseFIPS(100000)).to.eq(null);
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
