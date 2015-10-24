import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Circle} from 'react-d3';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var
      d3path   = d3.geo.path(),
      items = this.props.topoJSON.features
    ;
    return (
      React.DOM.g({
        className: "bubbles"
      },
        items.map(function(item) {
          return React.DOM.circle({
            className: "bubble",
            r: 2,
            transform: `translate(${d3path.centroid(item)})`
          })
        })
      )
    );
  }
});

