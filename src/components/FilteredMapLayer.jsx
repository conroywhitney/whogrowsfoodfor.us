import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3'

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var
      d3path    = d3.geo.path(),
      geography = this.props.topoJSON.features
    ;

    return (
      React.DOM.g({},
        geography
          .filter(this.props.filterFunction)
          .map(function(location) {
            return React.DOM.path({
              className: this.props.className,
              d:         d3path(location)
            })
          }, this)
      )
    );
  }

});
