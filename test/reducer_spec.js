import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';
import {INITIAL_STATE} from '../src/core';

describe('reducer', () => {

  const countyFIPS   = '41029';

	it('has an initial state', () => {
    const nextState = reducer(null, null);
    expect(nextState).to.equal(INITIAL_STATE);
  });

	it('handles SELECT at basic level', () => {
		const action    = {type: 'SELECT', fips: countyFIPS};
		const nextState = reducer(INITIAL_STATE, action);

		// simplest thing to make this pass is checking 'selected'
		// checking other attributes of state will make this too brittle
		expect(nextState.get('selected')).to.equal(countyFIPS);
	});

});
