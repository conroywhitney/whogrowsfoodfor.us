import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {ProductDropdown} from './ProductDropdown';
import {MapContainer}    from './MapContainer';

export const MainNaked = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="main-container">

      <ProductDropdown
        products={this.props.options} />
      <MapContainer />

    </div>;
  },

});

function mapStateToProps(state) {
  // pass everything through
  return {
    options: state.getIn(['data', 'products']).toJS().map(p => ({value: p.key, label: p.name}))
  };
}

export const Main = connect(mapStateToProps)(MainNaked);


