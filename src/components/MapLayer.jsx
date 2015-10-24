import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3'

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var
      d3path = d3.geo.path().projection(d3.geo.albersUsa())
    ;

    return (
      React.DOM.path({
        className: this.props.className,
        d: d3path(this.props.topoJSON)
      })
    );
  }

});
