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
    if (this.state.active.node() === this) return reset();

    var
      d3path     = d3.geo.path(),
      domElement = React.findDOMNode(this),
      innerPath  = domElement.firstChild,
      d3Data     = innerPath.getAttribute('d'),
      width      = 900,
      height     = 400
    ;

    this.state.active.classed("active", false);

    this.setState({
      active: d3.select(domElement).classed("active", true)
    });

    console.log(d3Data);

    var bounds    = d3path.bounds(d3Data),
        dx        = bounds[1][0] - bounds[0][0],
        dy        = bounds[1][1] - bounds[0][1],
        x         = (bounds[0][0] + bounds[1][0]) / 2,
        y         = (bounds[0][1] + bounds[1][1]) / 2,
        scale     = .9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y]
    ;

    console.log(bounds);

    d3.transition()
        .duration(750)
        .style("stroke-width", 1.5 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
  },

  reset: function() {
    active.classed("active", false);
    active = d3.select(null);

    g.transition()
        .duration(750)
        .style("stroke-width", "1.5px")
        .attr("transform", "");
  },

  render: function() {
    var
      d3path    = d3.geo.path(),
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
