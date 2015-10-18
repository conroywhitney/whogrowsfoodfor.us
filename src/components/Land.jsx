import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3'

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var d3path = d3.geo.path();

    return React.DOM.svg({width: this.props.width, height: this.props.height},
      React.DOM.path({
        className: 'land',
        d: d3path(this.props.topoJSON)
      })
    );
  }

});
