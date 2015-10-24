import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3'

export default React.createClass({
  mixins: [PureRenderMixin],

  // react findDomNode helper in component#didMount
  // attach event handler defined here

  handleClick: function() {
    console.log('ahndle click');
  },

  render: function() {
    var
      d3path = d3.geo.path()
    ;

    return (
      React.DOM.g({},
        React.DOM.path({
          className: this.props.className,
          d: d3path(this.props.topoJSON)
        })
      )
    );
  }

});
