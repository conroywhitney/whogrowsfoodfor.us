import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {landTopoJSON, stateTopoJSON, countyTopoJSON} from '../geography.js'

import MapLayer from './MapLayer';
import Bubbles from './Bubbles';

export default React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps: function() {
    return {
      detail: ["land", "states", "counties"],
      width: 900,
      height: 400
    }
  },

  getShade: function(fips) {
    return null;
  },

  getSize: function(fips) {
    return null;
  },

  colorbrewer: function() {
    return "#F0F";
  },

  showDetailLevel: function(level) {
    return this.props.detail.indexOf(level) > -1;
  },

  render: function() {
    return <div className="map">
      <svg width={this.props.width} height={this.props.height}>
        <MapLayer
          topoJSON={landTopoJSON}
          className="land"
        />
        <MapLayer
          topoJSON={stateTopoJSON}
          className="states"
        />
        <MapLayer
          topoJSON={countyTopoJSON}
          className="counties"
        />
      </svg>
    </div>
    ;
  }
});
