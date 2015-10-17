import {select, INITIAL_STATE} from './core';

export default function reducer(state, action) {
	if(!state)  { return INITIAL_STATE; }
	if(!action) { return state; }

  // Figure out which function to call and call it
	switch (action.type) {
		case 'SELECT':
			return select(state, action.fips);
	}
	// return unaltered state if we don't recognize the action
	return state;
}
