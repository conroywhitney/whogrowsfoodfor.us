import {Map, List, Set, fromJS} from 'immutable';

export const DEFAULT_LABEL = 'The United States of America';

export const ACTIONS = {
  setRegion: 'SET_REGION',
  setProduct: 'SET_PRODUCT'
};

export const INITIAL_STATE = fromJS({
  product: null,
  stat: null,
  selected: null,
  zoom: null,
  detail: Set(['land', 'states']),
  histograms: [],
  // fetch: https://github.com/github/fetch
  // use async actions to dispatch spinning/requesting/loading/showing
  data: {
    avocados:  require('../data/products/avocados.json'),
  }
});

export const TEMP_DIR = 'tmp/';
export const DATA_DIR = 'data/';
export const REGION_KEYS = ['key', 'shortName', 'longName'];
