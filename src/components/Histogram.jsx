import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    // thanks to http://bl.ocks.org/mbostock/3885304

    var data = this.props.data;

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    if(data) {
      x.domain(data.map(function(d) { return d.label; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]);
    }

    return (
      <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g transform={"translate(" + margin.left + "," + margin.top + ")"}>
          { data ?
            data.map(function(d) {
              return (
                <rect className="bar"
                      x={x(d.label)}
                      width={x.rangeBand()}
                      y={(d.value)}
                      height={height - y(d.value)}
                />
              )
            })
          : null }
        </g>
      </svg>
    );
  }

});
