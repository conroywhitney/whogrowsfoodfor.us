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

  radius: function(location) {
    if(!this.props.data) { return 0; }
    if(!location)        { return 0; }

    var
      data   = this.props.data.data,
      fips   = '' + location.id, // ensure FIPS is a string
      value  = data[fips],
      radius = this.scale(value)
    ;

    return radius;
  },

  scale: null,

  render: function() {
    var
      d3path    = d3.geo.path(),
      geography = this.props.topoJSON.features
    ;
    return (
      React.DOM.g({
        className: "bubbles"
      },
        geography.map(function(location) {
          return React.DOM.circle({
            className: "bubble",
            r: this.radius(location),
            transform: `translate(${d3path.centroid(location)})`
          })
        }, this)
      )
    );
  }

});

