import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Circle} from 'react-d3';

export default React.createClass({
  mixins: [PureRenderMixin],

  radius: function(location) {
    return 2;
  },

  render: function() {
    var
      d3path    = d3.geo.path(),
      geography = this.props.topoJSON.features,
      data      = this.props.data
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

