import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3'

export default React.createClass({

  getInitialState: function() {
    return {
      active: d3.select(null)
    }
  },

  handleClick: function(event) {

    var
      width      = 900,
      height     = 400,
      d3path     = d3.geo.path().projection(d3.geo.albersUsa()),
      domElement = React.findDOMNode(this),
      target     = event.target,
      d3Data     = target.getAttribute('d'),
      bounds     = target.getAttribute('bounds')
    ;

    if (this.state.active.node() === target) return this.reset();
    this.state.active.classed("active", false);

    this.setState({
      active: d3.select(target).classed("active", true)
    });

    var bounds    = d3path.bounds(d3Data),
        dx        = bounds[1][0] - bounds[0][0],
        dy        = bounds[1][1] - bounds[0][1],
        x         = (bounds[0][0] + bounds[1][0]) / 2,
        y         = (bounds[0][1] + bounds[1][1]) / 2,
        scale     = .9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y]
    ;

    d3.transition()
        .duration(750)
        .style("stroke-width", 1.5 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
  },

  reset: function() {
    this.state.active.classed("active", false);

    this.setState({
      active: d3.select(null)
    });

    d3.transition()
        .duration(750)
        .style("stroke-width", "1.5px")
        .attr("transform", "");
  },

  render: function() {
    var
      d3path    = d3.geo.path().projection(d3.geo.albersUsa()),
      geography = this.props.topoJSON.features
    ;

    return (
      React.DOM.g({},
        geography.map(function(location) {
          return React.DOM.path({
            className: this.props.className,
            d: d3path(location),
            onClick: this.handleClick
          })
        }, this)
      )
    );
  }

});
