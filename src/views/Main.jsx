import React                 from 'react';
import PureRenderMixin       from 'react-addons-pure-render-mixin';
import {connect}             from 'react-redux';
import ProductDropdown       from '../components/ProductDropdown';
import MapContainer          from '../components/MapContainer';
import * as actionCreators   from '../action_creators';
import {getLabel}            from '../label';
import {getStateFIPS}        from '../fips';

export const MainNaked = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="main container" ref="main">
      <ProductDropdown
        product={this.props.product}
        handleChange={this.props.setProduct}
      />
      <MapContainer
        selected={this.props.selected}
        label={this.props.label}
        productData={this.props.product_data}
        detailLevel={this.props.detail_level}
        setRegion={this.props.setRegion}
        countyLineFilter={this.countyLineFilter}
      />
    </div>;
  },

  countyLineFilter: function(location) {
    return getStateFIPS(location.id) == this.props.selected_state;
  }

});

const mapStateToProps = (state) => ({
  product:         state.get('product'),
  product_data:    state.getIn(['data', 'avocados', 'avocados', 'avocados_acres_area_bearing']).toJS(),
  selected:        state.get('selected'),
  label:           getLabel(state),
  detail_level:    state.get('detail')
});

export const Main = connect(mapStateToProps, actionCreators)(MainNaked);


