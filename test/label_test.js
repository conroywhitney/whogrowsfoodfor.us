import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import {INITIAL_STATE, DEFAULT_LABEL} from '../src/constants';
import {select, product} from '../src/core';
import {getLabel} from '../src/label';

describe('label', () => {

	describe('defaults', () => {

    it('should have default label by default', () => {
      expect(getLabel(INITIAL_STATE)).to.eq('Map of The United States of America');
    });

    it('should return null if given no state', () => {
      expect(getLabel(null, '000000')).to.be.null;
    });

  });

  describe('when have a region', () => {

    it('should set a state-related label', () => {
      var
        stateFIPS = '41000',
        stateName = 'Oregon',
        newState  = select(INITIAL_STATE, stateFIPS)
      ;
      expect(getLabel(newState)).to.eq(`Map of ${stateName}`);
    });

    it('should set a county-related label', () => {
      var
        countyFIPS = '41029',
        countyName = 'Jackson County, OR',
        newState   = select(INITIAL_STATE, countyFIPS)
      ;
      expect(getLabel(newState)).to.eq(`Map of ${countyName}`);
    });

  });

});
