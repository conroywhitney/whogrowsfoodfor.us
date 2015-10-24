import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {landTopoJSON, stateTopoJSON, stateTopoMesh, countyTopoJSON} from '../geography.js'

import MapLayer from './MapLayer';
import ClickableMapLayer from './ClickableMapLayer';
import Bubbles from './Bubbles';

export default React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps: function() {
    return {
      width: 900,
      height: 400,
      detailLevel: ['land', 'states']
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
    return this.props.detailLevel.indexOf(level) > -1;
  },

  render: function() {
    return (
      <div className="map">
        <svg width={this.props.width} height={this.props.height}>
          {this.showDetailLevel('land') ?
            <MapLayer
              topoJSON={landTopoJSON}
              className="land"
            />
          : null }
          {this.showDetailLevel('states') ?
            <ClickableMapLayer
              topoJSON={stateTopoJSON}
              className="feature"
              setRegion={this.props.setRegion}
            />
          : null }
          {this.showDetailLevel('states') ?
            <MapLayer
              topoJSON={stateTopoMesh}
              className="states"
            />
          : null }
          {this.showDetailLevel('counties') ?
            <MapLayer
              topoJSON={countyTopoJSON}
              className="counties"
              data={this.props.productData}
            />
          : null }
          <Bubbles
            topoJSON={countyTopoJSON}
            className="bubbles"
            data={this.props.productData}
          />
        </svg>
      </div>
   );
  }
});
