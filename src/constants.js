import {Map, List, fromJS} from 'immutable';

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
  detail: ['land', 'states'],
  histograms: [],
  // fetch: https://github.com/github/fetch
  // use async actions to dispatch spinning/requesting/loading/showing
  data: {
    labels:    require('../data/labels.json'),
    geography: require('../data/us-geography.topo.json'),
    products:  require('../data/products.json')
  }
});

export const TEMP_DIR = 'tmp/';
export const DATA_DIR = 'data/';
