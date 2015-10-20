import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {INITIAL_STATE} from '../src/constants';
import {setRegion, setProduct} from '../src/action_creators';

describe('action creators', () => {

  describe('SELECT', () => {

    it('should fire SELECT action with FIPS', () => {
      var fips = '41029';
      expect(setRegion(fips)).to.eql({
        type: 'SELECT',
        fips: fips
      });
    });

  });

  describe('setProduct', () => {

    it('should fire PRODUCT action', () => {
      var product = 'spinach';
      expect(setProduct(product)).to.eql({
        type: 'PRODUCT',
        product: product
      });
    });

  });

});
