import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {getLabel, defaultLabel} from '../src/label';

describe('label', () => {

  function initialState() {
    return fromJS({
      label: defaultLabel,
      data: {
        labels: require('../data/labels.json')
      }
    });
	}

	describe('state', () => {

		var state = initialState();

		it('should have default label by default', () => {
			expect(state.get('label')).to.eq(defaultLabel);
			expect(state.get('label')).to.have.length.above(0);
		});

	});

	describe('getLabel', () => {

		var state = initialState();

		it('should return null if given no state', () => {
			expect(getLabel(null, '000000')).to.be.null;
		});

		it('should return default if given null FIPS', () => {
			expect(getLabel(state, null)).to.eq(defaultLabel);
			expect(getLabel(state, null)).to.have.length.above(0);
		});

	});

});
