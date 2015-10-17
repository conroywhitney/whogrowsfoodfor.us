import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';
import {INITIAL_STATE} from '../src/core';

describe('reducer', () => {

	it('has an initial state', () => {
    const nextState = reducer(null, null);
    expect(nextState).to.equal(INITIAL_STATE);
  });

	xit('handles SELECT', () => {

	});

});
