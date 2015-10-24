import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Circle} from 'react-d3';
import {normalizeFIPS} from '../fips';

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

  handleClick: function(event) {
    var
      target     = event.target,
      fips       = target.id
    ;

    // the exciting part -- update global state with fips code!
    // this method has been passed down from the outermost container
    this.props.setRegion(fips);
  },

  reset: function() {
    // the exciting part -- update global state to nothing!
    // this function was passed down from the outermost container
    this.props.setRegion(null);
  },

  location_value: function(location) {
    if(!this.props.data) { return null; }
    if(!location)        { return null; }

    var
      data   = this.props.data.data,
      fips   = normalizeFIPS(location.id), // ensure FIPS is a string of expected format (I'm lookin' at you, Cali)
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
              transform: `translate(${d3path.centroid(location)})`,
              onClick: this.handleClick
            })
          },
          this
        )
      )
    );
  }

});

