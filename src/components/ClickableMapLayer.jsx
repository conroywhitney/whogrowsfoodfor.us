import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';
import {d3path} from '../geography';
import transition from 'd3-transition';
import ease from 'd3-ease';
import {normalizeFIPS} from '../fips';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var
      geography       = this.props.topoJSON.features,
      highlightedFIPS = this.props.highlightedFIPS
    ;

    return (
      React.DOM.g({},
        geography.map(function(location) {
          var
            fips           = normalizeFIPS(location.id),
            isHighlighted  = (this.props.highlightedFIPS == fips),
            highlightClass = isHighlighted ? ' highlighted' : '',
            className      = this.props.className + highlightClass
          ;

          return React.DOM.path({
            key: location.id, // to silence warnings
            id: location.id, // to actually use in application
            className: className,
            d: d3path(location),
            onClick: this.props.handleClick,
            onMouseOver: this.props.handleHover
          })
        }, this)
      )
    );
  }

});
