import React               from 'react';
import PureRenderMixin     from 'react-addons-pure-render-mixin';
import {connect}           from 'react-redux';
import ProductDropdown     from '../components/ProductDropdown';
import MapContainer        from '../components/MapContainer';
import * as actionCreators from '../action_creators';
import {getLabel}          from '../label'

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
      />
    </div>;
  },

});

const mapStateToProps = (state) => ({
  product:      state.get('product'),
  product_data: state.getIn(['data', 'avocados', 'avocados', 'avocados_acres_area_bearing', 'data']).toJS(),
  selected:     state.get('selected'),
  label:        getLabel(state)
});

export const Main = connect(mapStateToProps, actionCreators)(MainNaked);


