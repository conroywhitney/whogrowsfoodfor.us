import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Circle} from 'react-d3';

export default React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount: function() {
    var
      max = this.props.data.stats.max
    ;

    // set scale method using max value from data
    this.scale = d3.scale.quantile().domain([0, max]).range([2, 4, 9, 16])
  },

  scale: null,

  location_value: function(location) {
    if(!this.props.data) { return null; }
    if(!location)        { return null; }

    var
      data   = this.props.data.data,
      fips   = '' + location.id, // ensure FIPS is a string
      value  = data[fips]
    ;

    return value;
  },

  radius: function(location) {
    var
      value  = this.location_value(location),
      radius = this.scale(value)
    ;
    return radius;
  },

  include_location: function(location) {
    var value = this.location_value(location);
    return (value && value !== null && value !== undefined);
  },

  render: function() {
    var
      d3path    = d3.geo.path(),
      geography = this.props.topoJSON.features
    ;
    return (
      React.DOM.g({
        className: "bubbles"
      },
        geography
          .filter(g => this.include_location(g))
          .map(function(location) {
            return React.DOM.circle({
              key: location.id, // to silence react warnings
              id: location.id, // to actually use in application
              className: "bubble",
              r: this.radius(location),
              transform: `translate(${d3path.centroid(location)})`
            })
          },
          this
        )
      )
    );
  }

});

