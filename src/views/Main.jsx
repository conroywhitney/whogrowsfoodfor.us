import React             from 'react';
import PureRenderMixin   from 'react-addons-pure-render-mixin';
import {connect}         from 'react-redux';
import {ProductDropdown} from '../components/ProductDropdown';
import {MapContainer}    from '../components/MapContainer';

const Main = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="main container" ref="main">
      <h1>MAIN CONTAINER !!!</h1>
      <ProductDropdown product={this.props.product} />
      <MapContainer selected={this.props.selected} label={this.props.label} />
    </div>;
  },

});

const mapStateToProps = (state) => ({
  product:  state.get('product'),
  selected: state.get('selected'),
  label:    state.get('label')
});

export default connect(mapStateToProps)(Main);


