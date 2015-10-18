import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE} from '../src/core'
import topojson from 'topojson'

export const topoJSON = INITIAL_STATE.getIn(['data', 'geography']).toJS();
export const land     = topojson.feature(topoJSON, topoJSON.objects.land);
export const counties = topojson.feature(topoJSON, topoJSON.objects.counties);
export const states   = topojson.mesh(topoJSON,
                                      topoJSON.objects.states,
                                      function(a, b) { return a.id !== b.id; });

