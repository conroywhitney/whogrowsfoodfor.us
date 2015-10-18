import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {landTopoJSON, stateTopoJSON, countyTopoJSON} from '../geography.js'

import Land from './Land';
import States from './States';
import Counties from './Counties';
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
        <Land
          topoJSON={landTopoJSON}
          className="land"
          width={this.props.width}
          height={this.props.height}
        />
        <States
          topoJSON={stateTopoJSON}
          className="states"
        />
        <Counties
          topoJSON={countyTopoJSON}
          className="counties"
        />
        <Bubbles
          topoJSON={countyTopoJSON}
          className="bubble"
        />
      </svg>
    </div>
    ;
  }
});
