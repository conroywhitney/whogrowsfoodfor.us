import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {getStateFIPS, normalizeFIPS, FIPS_NATIONAL} from '../src/fips'

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

    it('should return national if given null', () => {
      expect(normalizeFIPS(null)).to.eq(FIPS_NATIONAL);
    });

    it('should return back the same 2-digit state FIPS code', () => {
      var stateFIPS = '41000';
      expect(normalizeFIPS(stateFIPS)).to.eq(stateFIPS);
    })

    it('should return back the same 1-digit state FIPS code', () => {
      var stateFIPS = '06000';
      expect(normalizeFIPS(stateFIPS)).to.eq(stateFIPS);
    })

    it('should return back the same county FIPS code', () => {
      var countyFIPS = '41029';
      expect(normalizeFIPS(countyFIPS)).to.eq(countyFIPS);
    });

    it('should return national if given national', () => {
      expect(normalizeFIPS(FIPS_NATIONAL)).to.eq(FIPS_NATIONAL);
    });

    it('should return national if given as 99 state code string', () => {
      expect(normalizeFIPS('99')).to.eq(FIPS_NATIONAL);
    });

    it('should return national if given as 99 state code int', () => {
      expect(normalizeFIPS(99)).to.eq(FIPS_NATIONAL);
    });

    it('should handle 2-digit state fips if given as int', () => {
      expect(normalizeFIPS(41)).to.eq('41000');
    });

    it('should handle 1-digit state fips if given as int', () => {
      expect(normalizeFIPS(6)).to.eq('06000');
    });

    it('should handle 2-digit state fips if given as string', () => {
      expect(normalizeFIPS('41')).to.eq('41000');
    });

    it('should handle 1-digit state fips if given as string', () => {
      expect(normalizeFIPS('6')).to.eq('06000');
    });

    it('should handle county fips if given as int', () => {
      expect(normalizeFIPS(41027)).to.eq('41027');
    });

  });

});
