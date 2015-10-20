import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer, {ACTIONS} from '../src/reducer';
import {INITIAL_STATE} from '../src/constants';

describe('reducer', () => {

  it('has an initial state', () => {
    const nextState = reducer(null, null);
    expect(nextState).to.equal(INITIAL_STATE);
  });

  describe('SELECT', () => {

    const countyFIPS   = '41029';

    it('handles SELECT at basic level', () => {
      const action    = {type: ACTIONS.select, fips: countyFIPS};
      const nextState = reducer(INITIAL_STATE, action);

      // simplest thing to make this pass is checking 'selected'
      // checking other attributes of state will make this too brittle
      expect(nextState.get('selected')).to.equal(countyFIPS);
    });

  });

  describe('PRODUCT', () => {

    const productKey  = 'spinach';
    const productName = 'Spinach';

    it('sets product field', () => {
      const action    = {type: ACTIONS.product, product: productKey};
      const nextState = reducer(INITIAL_STATE, action);

      // simplest thing to make this pass is checking 'selected'
      // checking other attributes of state will make this too brittle
      expect(nextState.get('product').name).to.equal(productName);
    });

  });

});
