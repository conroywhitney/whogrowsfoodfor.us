import React           from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect}       from 'react-redux';
import ProductDropdown from '../components/ProductDropdown';
import MapContainer    from '../components/MapContainer';

import {getLabel}      from '../label'

export const MainNaked = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="main container" ref="main">
      <ProductDropdown
        product={this.props.product}
        handleChange={this.productChanged}
      />
      <MapContainer
        selected={this.props.selected}
        label={this.props.label}
      />
    </div>;
  },

  productChanged: function(newValue, selectedOptions) {
    console.log(`product dropdown changed [${newValue}]`);
  }

});

const mapStateToProps = (state) => ({
  product:  state.get('product'),
  selected: state.get('selected'),
  label:    getLabel(state)
});

export const Main = connect(mapStateToProps)(MainNaked);


