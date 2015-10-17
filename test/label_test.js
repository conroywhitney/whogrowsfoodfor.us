import {expect} from 'chai';
import {getLabel, defaultLabel} from '../src/label';

describe('label', () => {

	describe('getLabel', () => {

		it('should return default if given nothing', () => {
			expect(getLabel(null, null)).to.eq(defaultLabel);
			expect(getLabel(null, null)).to.have.length.above(0);
		});

	});

});
