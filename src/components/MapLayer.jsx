import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3'

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
var width = 900,
    height = 400;

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var d3path = d3.geo.path()
    .projection(projection);

    return (
      React.DOM.path({
        className: this.props.className,
        d: d3path(this.props.topoJSON)
      })
    );
  }

});
