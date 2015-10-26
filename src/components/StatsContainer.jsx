import React            from 'react';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import Title            from './Title';
import {Treemap}        from 'react-d3';
import {getRegionLabel} from '../label';
import {isFipsState}    from '../fips';

export default React.createClass({
  mixins: [PureRenderMixin],

  transformTreemap: function() {
    if(!this.props.productData.fips) { return false; }

    console.log('transform treemap');
    var
      data      = this.props.productData.fips,
      keys      = Object.keys(data),
      stateKeys = keys.filter(key => isFipsState(key))
    ;
    return stateKeys.map(key => ({label: getRegionLabel(key), value: data[key]}))
  },

  render: function() {
    return (
      <div className="stats-container">
        <Treemap
          data={this.transformTreemap()}
          width={450}
          height={250}
          textColor="#484848"
          fontSize="12px"
          title="Treemap"
          hoverAnimation={false}
        />
      </div>
    );
  }

});

