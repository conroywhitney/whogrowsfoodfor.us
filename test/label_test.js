import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {getLabel, DEFAULT_LABEL} from '../src/label';
import {INITIAL_STATE} from '../src/core';

describe('label', () => {

	describe('state', () => {

		it('should have default label by default', () => {
			expect(INITIAL_STATE.get('label')).to.eq(DEFAULT_LABEL);
			expect(INITIAL_STATE.get('label')).to.have.length.above(0);
		});

	});

	describe('getLabel', () => {

		it('should return null if given no state', () => {
			expect(getLabel(null, '000000')).to.be.null;
		});

		it('should return default if given null FIPS', () => {
			expect(getLabel(INITIAL_STATE, null)).to.eq(DEFAULT_LABEL);
			expect(getLabel(INITIAL_STATE, null)).to.have.length.above(0);
		});

	});

});
