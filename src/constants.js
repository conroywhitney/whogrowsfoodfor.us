import {Map, List, fromJS} from 'immutable';

export const DEFAULT_LABEL = "The United States of America";

export const INITIAL_STATE = fromJS({
  product: null,
  stat: null,
  selected: null,
  zoom: null,
  detail: ['land', 'states'],
  histograms: [],
  label: DEFAULT_LABEL,
  data: {
    labels:    require('../data/labels.json'),
    geography: require('../data/us-geography.topo.json'),
    products:  require('../data/products.json')
  }
});


