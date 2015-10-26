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
      chartHeight    = this.props.height,
      barWidth       = 24,
      barPadding     = 4,
      yScaleFunction = d3.scale.linear().range([0, chartHeight]),
      formatFunction = this.numberWithCommas
    ;

    yScaleFunction.domain([0, d3.max(data, function(d) { return d.value; })])

    return (
      React.DOM.svg({
        width: chartWidth,
        height: chartHeight,
        className: "chart"
      },
        sorted.map(function(d, i) {
          var
            barHeight      = yScaleFunction(d.value),
            xOffset        = (i * barWidth) + barWidth - barPadding,  // make sure lines up on far-right without going over
            xPos           = chartWidth - xOffset,
            yPos           = chartHeight - barHeight,
            formattedValue = formatFunction(d.value),
            groupPosition  = "translate(" + xPos + "," + yPos + ")",
            labelUnits     = ' acres',
            label          = barHeight > 100 ? formattedValue + labelUnits : '',
            labelX         = xPos + (barHeight / 2 - 2),
            labelY         = 3,
            regionName     = d.label,
            regionX        = labelX,
            regionY        = yPos - 50
          ;

          return (
            React.DOM.g({
              transform: groupPosition
            },
              React.DOM.rect({
                className: "bar",
                width: barWidth - barPadding,
                height: barHeight
              })/*,
              React.DOM.text({
                className: "valueLabel",
                x: labelX,
                y: labelY,
                dy: "0.35em"
              }, label),
              React.DOM.text({
                className: "regionLabel",
                x: regionX,
                y: regionY,
                dy: "0.35em",
                transform: "rotate(90)"
              }, regionName)*/
            )
          )
        })
      )
    );
  }

});

