import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {landTopoJSON, stateTopoJSON, stateTopoMesh, countyTopoJSON, countyTopoMesh} from '../geography.js'

import MapLayer          from './MapLayer';
import ClickableMapLayer from './ClickableMapLayer';
import FilteredMapLayer  from './FilteredMapLayer';
import Bubbles           from './Bubbles';

export default React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps: function() {
    return {
      width: 960,
      height: 500,
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
    return this.props.detailLevel.includes(level);
  },

  render: function() {
    return (
      <div className="map">
        <svg width={this.props.width} height={this.props.height}>
          <g>
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
                width={this.props.width}
                height={this.props.height}
              />
            : null }
            {this.showDetailLevel('states') ?
              <MapLayer
                topoJSON={stateTopoMesh}
                className="states"
              />
            : null }
            {this.showDetailLevel('counties') ?
              <FilteredMapLayer
                topoJSON={countyTopoJSON}
                className="counties"
                data={this.props.productData}
                filterFunction={this.props.countyLineFilter}
              />
            : null }
            <Bubbles
              topoJSON={countyTopoJSON}
              className="bubbles"
              data={this.props.productData}
              setRegion={this.props.setRegion}
            />
          </g>
        </svg>
      </div>
   );
  }
});
