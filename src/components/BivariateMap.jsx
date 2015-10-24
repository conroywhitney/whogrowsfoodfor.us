import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {landTopoJSON, stateTopoJSON, stateTopoMesh, countyTopoJSON, countyTopoMesh, d3path, getTopoJSONFromFIPS} from '../geography.js'
import {getStateFIPS}        from '../fips';

import MapLayer          from './MapLayer';
import ClickableMapLayer from './ClickableMapLayer';
import FilteredMapLayer  from './FilteredMapLayer';
import Bubbles           from './Bubbles';

export default React.createClass({

  getDefaultProps: function() {
    return {
      width: 960,
      height: 500,
      detailLevel: ['land', 'states']
    }
  },

  getInitialState: function() {
    return {
      active: d3.select(null)
    }
  },

  handleMapClick: function(event) {
    var
      target     = event.target,
      fips       = target.id
    ;

    // if click same location again, should reset instead
    if(this.state.active.node() === target) {
      return this.resetMap();
    } else {
      // the exciting part -- update global state with fips code!
      // this method has been passed down from the outermost container
      this.props.setRegion(fips);

      // handle fancy d3 stuff
      this.d3Highlight(target);
      this.d3ZoomIn(target);
    }
  },

  resetMap: function() {
    // the exciting part -- update global state to nothing!
    // this function was passed down from the outermost container
    this.props.setRegion(null);

    // handle fancy d3 stuff
    this.d3Unhighlight();
    this.d3ZoomOut();
  },

  getSelectedTopoJSON: function() {
    var
      stateFIPS = getStateFIPS(this.props.selectedFIPS),
      topoJSON  = getTopoJSONFromFIPS(stateFIPS)
    ;

    console.log('getSelectedTopoJSON');
    console.log(this.props.selectedFIPS);
    console.log(stateFIPS);
    console.log(topoJSON);

    return topoJSON;
  },

  d3Highlight: function(target) {
    // d3 updates for selecting state outline
    this.state.active.classed("active", false);
    this.setState({
      active: d3.select(target).classed("active", true)
    });
  },

  d3ZoomIn: function(target) {
    var
      width     = this.props.width,
      height    = this.props.height,
      d         = this.getSelectedTopoJSON(),
      bounds    = d3path.bounds(d),
      dx        = bounds[1][0] - bounds[0][0],
      dy        = bounds[1][1] - bounds[0][1],
      x         = (bounds[0][0] + bounds[1][0]) / 2,
      y         = (bounds[0][1] + bounds[1][1]) / 2,
      scale     = .9 / Math.max(dx / width, dy / height),
      translate = [width / 2 - scale * x, height / 2 - scale * y],
      wrapper   = d3.select('g')
    ;

    wrapper.transition()
        .duration(500)
        .ease("linear-in")
        .style("stroke-width", 1.5 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")")
    ;
  },

  d3Unhighlight: function() {
    this.state.active.classed("active", false);
    this.setState({
      active: d3.select(null)
    });
  },

  d3ZoomOut: function() {
    d3.select('g').transition()
        .duration(500)
        .ease("linear-out")
        .style("stroke-width", "1.5px")
        .attr("transform", "")
    ;
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
                handleClick={this.handleMapClick}
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
              handleClick={this.handleMapClick}
            />
          </g>
        </svg>
      </div>
   );
  }
});
