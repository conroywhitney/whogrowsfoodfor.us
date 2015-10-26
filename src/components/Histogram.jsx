import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';

export default React.createClass({
  mixins: [PureRenderMixin],

  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  render: function() {
    // thanks to http://bl.ocks.org/mbostock/3885304

    var
      data           = this.props.data || [],
      sorted         = data.sort(function(a, b) { return b.value - a.value }), // descending
      chartWidth     = this.props.width,
      barHeight      = 20,
      chartHeight    = barHeight * data.length,
      xScaleFunction = d3.scale.linear().range([0, chartWidth]),
      formatFunction = this.numberWithCommas
    ;

    xScaleFunction.domain([0, d3.max(data, function(d) { return d.value; })])

    return (
      React.DOM.svg({
        width: chartWidth,
        height: chartHeight,
        className: "chart"
      },
        sorted.map(function(d, i) {
          var
            barWidth       = xScaleFunction(d.value),
            xPos           = chartWidth - barWidth,
            yPos           = i * barHeight,
            formattedValue = formatFunction(d.value),
            groupPosition  = "translate(" + xPos + "," + yPos + ")"
          ;

          return (
            React.DOM.g({
              transform: groupPosition
            },
              React.DOM.rect({
                className: "bar",
                width: barWidth,
                height: barHeight - 1
              },
                React.DOM.text({
                  x: barWidth - 3,
                  y: barHeight / 2,
                  dy: "0.35em"
                })
              )
            )
          )
        })
      )
    );
  }

});
