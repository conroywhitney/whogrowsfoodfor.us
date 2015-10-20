import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE} from './constants'
import topojson from 'topojson'

export const topoJSON       = INITIAL_STATE.getIn(['data', 'geography']).toJS();
export const landTopoJSON   = topojson.feature(topoJSON, topoJSON.objects.land);
export const countyTopoJSON = topojson.feature(topoJSON, topoJSON.objects.counties);
export const stateTopoJSON  = topojson.mesh(topoJSON,
                                      topoJSON.objects.states,
                                      function(a, b) { return a.id !== b.id; });

