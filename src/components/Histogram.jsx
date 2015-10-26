import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    // thanks to http://bl.ocks.org/mbostock/3885304

    var
      data      = this.props.data || [],
      width     = this.props.width,
      barHeight = 20,
      height    = barHeight * data.length,
      x         = d3.scale.linear().range([0, width])
    ;

    x.domain([0, d3.max(data, function(d) { return d.value; })])

    return (
      React.DOM.svg({
        width: width,
        height: height,
        className: "chart"
      },
        data.map(function(d, i) {
          return (
            <g transform={"translate(0," + i * barHeight + ")"}>
              <rect
                className="bar"
                width={x(d.value)}
                height={barHeight - 1}
              />
            </g>
          )
        })
      )
    );
  }

});
