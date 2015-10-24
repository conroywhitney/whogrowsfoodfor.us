import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Circle} from 'react-d3';
import {d3path} from '../geography';

export default React.createClass({
  mixins: [PureRenderMixin],

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

  getCentroid: function() {
    return d3path.centroid(this.props.location);
  },

  getRadius: function() {
    return this.props.scaleFunction(this.props.value);
  },

  render: function() {
    return (
      React.DOM.circle({
        className: "bubble",
        key: this.props.fips, // to silence react warnings
        id: this.props.fips, // to actually use in application
        r: this.getRadius(),
        transform: `translate(${this.getCentroid()})`,
        onClick: this.handleClick
      })
    );
  }

});


