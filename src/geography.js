import {Map, List, toJS} from 'immutable';
import {INITIAL_STATE}   from './constants'
import topojson          from 'topojson';
import d3                from 'd3';

export const topoJSON       = require('../data/us-geography.topo.json');
export const landTopoJSON   = topojson.feature(topoJSON, topoJSON.objects.land);
export const countyTopoJSON = topojson.feature(topoJSON, topoJSON.objects.counties);
export const countyTopoMesh = topojson.mesh(topoJSON, topoJSON.objects.counties, function(a, b) { return a.id !== b.id; });
export const stateTopoJSON  = topojson.feature(topoJSON, topoJSON.objects.states);
export const stateTopoMesh  = topojson.mesh(topoJSON, topoJSON.objects.states, function(a, b) { return a.id !== b.id; });

export const d3path = d3.geo.path();
