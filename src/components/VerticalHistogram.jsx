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
      totalItems     = sorted.length,
      maxItems       = 40,
      itemOverage    = totalItems - maxItems,
      tooManyItems   = itemOverage > 0,
      sliced         = tooManyItems ? sorted.slice(0, maxItems - 1) : sorted,
      overageLabel   = tooManyItems ? (itemOverage + 1) + ' locations not shown' : '',
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
        sliced.map(function(d, i) {
          var
            barHeight      = yScaleFunction(d.value),
            xOffset        = (i * barWidth) + barWidth - barPadding,  // make sure lines up on far-right without going over
            xPos           = chartWidth - xOffset,
            yPos           = chartHeight - barHeight,
            formattedValue = formatFunction(d.value),
            groupPosition  = "translate(" + xPos + "," + yPos + ")",
            labelUnits     = ' acres',
            barTooShort    = barHeight < 100,
            label          = formattedValue,
            labelX         = barTooShort ? 5 : -(barWidth / 2 - 2),
            labelY         = (barWidth / 2 - 2),
            labelClass     = barTooShort ? 'exterior' : 'interior',
            labelRotate    = 270,
            regionName     = d.label,
            regionX        = -(barHeight + 5),
            regionY        = labelY
          ;

          return (
            React.DOM.g({
              transform: groupPosition
            },
              React.DOM.rect({
                className: "bar",
                width: barWidth - barPadding,
                height: barHeight
              }),
              React.DOM.text({
                className: "valueLabel " + labelClass,
                x: labelX,
                y: labelY,
                dy: "0.35em",
                transform: "rotate(" + labelRotate + ")",
              }, label),
              React.DOM.text({
                className: "regionLabel",
                x: regionX,
                y: regionY,
                dy: "0.35em",
                transform: "rotate(" + labelRotate + ")"
              }, regionName)
            )
          )
        }),
        React.DOM.text({
          className: "overageLabel",
          x: -205,
          y: 15,
          dy: "0.35em",
          transform: "rotate(" + 270 + ")"
        }, overageLabel)
      )
    );
  }

});

