import {INITIAL_STATE} from './constants';
import {select, product} from './core';

export const ACTIONS = {
  select: 'SELECT',
  product: 'PRODUCT'
};

export default function reducer(state, action) {
  if(!state)  { return INITIAL_STATE; }
  if(!action) { return state; }

  // Figure out which function to call and call it
  switch (action.type) {
    case ACTIONS.select:
      return select(state, action.fips);
    case ACTIONS.product:
      return product(state, action.product);
  }
  // return unaltered state if we don't recognize the action
  return state;
}
