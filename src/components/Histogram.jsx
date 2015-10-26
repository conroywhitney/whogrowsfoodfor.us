import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    // thanks to http://bl.ocks.org/mbostock/3885304

    var
      data        = this.props.data || [],
      sorted      = data.sort(function(a, b) { return b.value - a.value }), // descending
      chartWidth  = this.props.width,
      barHeight   = 20,
      chartHeight = barHeight * data.length,
      x           = d3.scale.linear().range([0, chartWidth])
    ;

    x.domain([0, d3.max(data, function(d) { return d.value; })])

    return (
      React.DOM.svg({
        width: chartWidth,
        height: chartHeight,
        className: "chart"
      },
        sorted.map(function(d, i) {
          var
            barWidth = x(d.value),
            xPos = chartWidth - barWidth,
            yPos = i * barHeight
          ;

          return (
            <g transform={"translate(" + xPos + "," + yPos + ")"}>
              <rect
                className="bar"
                width={barWidth}
                height={barHeight - 1}
              />
            </g>
          )
        })
      )
    );
  }

});
