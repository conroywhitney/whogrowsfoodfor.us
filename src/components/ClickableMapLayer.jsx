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
      target     = event.target,
      fips       = target.id
    ;

    // if click same location again, should reset instead
    if (this.state.active.node() === target) return this.reset();

    // the exciting part -- update global state with fips code!
    // this method has been passed down from the outermost container
    this.props.setRegion(fips);

    // handle fancy d3 stuff
    this.d3Highlight(target);
    //this.d3ZoomIn(target);
  },

  d3Highlight: function(target) {
    // d3 updates for selecting state outline
    this.state.active.classed("active", false);
    this.setState({
      active: d3.select(target).classed("active", true)
    });
  },

  d3ZoomIn: function(target) {
    // transform / scale calculations for zooming to bounding box
    // TODO: fix  =(
    var width     = 900,
        height    = 400,
        d3data    = target.getAttribute('d'),
        d3path    = d3.geo.path().projection(d3.geo.albersUsa()),
        bounds    = d3path.bounds(d3data),
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
    // the exciting part -- update global state to nothing!
    // this function was passed down from the outermost container
    this.props.setRegion(null);

    // handle fancy d3 stuff
    this.d3Unhighlight();
    //this.d3ZoomOut();
  },

  d3Unhighlight: function() {
    this.state.active.classed("active", false);
    this.setState({
      active: d3.select(null)
    });
  },

  d3ZoomOut: function() {
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
            id: location.id,
            className: this.props.className,
            d: d3path(location),
            onClick: this.handleClick
          })
        }, this)
      )
    );
  }

});
