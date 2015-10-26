import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3'
import {d3path} from '../geography';

export default React.createClass({
  mixins: [PureRenderMixin],

  componentWillUpdate: function(nextProps, nextState) {
    console.log('filtered map layer : component will update');
  },

  render: function() {
    var
      geography = this.props.topoJSON.features,
      selected  = this.props.selectedFIPS
    ;

    console.log('filtered map layer : render');

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
