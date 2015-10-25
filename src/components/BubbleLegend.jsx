import React              from 'react';
import PureRenderMixin    from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var
      legendCx      = this.props.cx,
      legendCy      = this.props.cy,
      scaleFunction = this.props.scaleFunction,
      quantiles     = scaleFunction.quantiles()
    ;

    return (
      React.DOM.g({
        className: "legend",
        transform: "translate(" + legendCx + "," + legendCy + ")"
      },
        quantiles.map(function(quant) {
          var
            value  = quant,
            radius = scaleFunction(value),
            cy     = -radius
          ;
          return React.DOM.circle({
            r: radius,
            cy: cy
          })
        })
      )
    );
  }

});
