import React              from 'react';
import PureRenderMixin    from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    if(!this.props.quantFunction) { return false; }

    var
      legendCx      = this.props.cx,
      legendCy      = this.props.cy,
      quantFunction = this.props.quantFunction,
      quantiles     = quantFunction.quantiles(),
      quantSize     = quantiles.length
    ;

    // reavers, man
    if(isNaN(quantiles[0])) { return false; }

    return(quantiles?
      React.DOM.g({
        className: "legend",
        transform: "translate(" + legendCx + "," + legendCy + ")"
      },
        quantiles.map(function(quant, quantIndex) {
          var
            value         = quant,
            radius        = quantFunction(value),
            cy            = -radius,
            xOffset       = -50,
            yOffset       = -20,
            bubbleOffsetX = xOffset,
            bubbleOffsetY = ((quantSize - quantIndex) * yOffset)
          ;
          return React.DOM.circle({
            r: radius,
            cy: cy,
            transform: "translate(" + bubbleOffsetX + ", " + bubbleOffsetY  + ")"
          })
        })
      )
    :null);
  }

});
