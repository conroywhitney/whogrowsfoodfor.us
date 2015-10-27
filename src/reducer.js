import {INITIAL_STATE, ACTIONS} from './constants';
import {select, product, highlight} from './core';

export default function reducer(state, action) {
  if(!state)  { return INITIAL_STATE; }
  if(!action) { return state; }

  // Figure out which function to call and call it
  switch (action.type) {
    case ACTIONS.setRegion:
      return select(state, action.fips);
    case ACTIONS.setProduct:
      return product(state, action.product);
    case ACTIONS.highlightRegion:
      return highlight(state, action.fips);
  }
  // return unaltered state if we don't recognize the action
  return state;
}
