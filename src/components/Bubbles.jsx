import React              from 'react';
import PureRenderMixin    from 'react-addons-pure-render-mixin';
import {normalizeFIPS}    from '../fips';
import Bubble             from './Bubble';

export default React.createClass({
  mixins: [PureRenderMixin],

  scaleFunction: null,

  colorFunction: null,

  componentWillMount: function() {
    var
      max = this.props.data.stats.max
    ;

    // set scale method using max value from data
    this.scaleFunction = d3.scale.quantile().domain([0, max]).range([2, 4, 9, 16])

    // TODO: set color range based on quantile
    this.colorFunction = null;
  },

  locationFIPS: function(location) {
    return normalizeFIPS(location.id);
  },

  locationValue: function(location) {
    if(!this.props.data) { return null; }
    if(!location)        { return null; }

    var
      data   = this.props.data.data,
      fips   = this.locationFIPS(location),
      value  = data[fips]
    ;

    return value;
  },

  filteredLocations: function(locations) {
    return locations.filter(location => this.filterLocation(location))
  },

  filterLocation: function(location) {
    var value = this.locationValue(location);
    return (value && value !== null && value !== undefined);
  },

  render: function() {
    var
      locations = this.props.topoJSON.features,
      filtered  = this.filteredLocations(locations)
    ;

    return (
      React.DOM.g({
        className: "bubbles"
      },
        filtered.map(function(location) {
          return (
            <Bubble
              location={location}
              fips={this.locationFIPS(location)}
              value={this.locationValue(location)}
              scaleFunction={this.scaleFunction}
              colorFunction={this.colorFunction}
            />
          );
        }, this)
      )
    );
  }

});

