import React                      from 'react';
import PureRenderMixin            from 'react-addons-pure-render-mixin';
import {connect}                  from 'react-redux';
import ProductDropdown            from '../components/ProductDropdown';
import MapContainer               from '../components/MapContainer';
import * as actionCreators        from '../action_creators';
import {getLabel}                 from '../label';
import {getStateFIPS}             from '../fips';
import {productData, getDataForQuery} from '../products';

export const MainNaked = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return (
      <div className="ui container">

        <div className="ui stackable divided grid">

          <div className="ui row">
            <div className="sixteen wide column">
              <MapContainer
                selected={this.props.selected}
                label={this.props.label}
                productData={this.product_data}
                detailLevel={this.props.detail_level}
                setRegion={this.props.setRegion}
                countyLineFilter={this.countyLineFilter}
              />
            </div>
          </div>

          <div className="ui row">
            <div className="eight wide column">
              <ProductDropdown
                product={this.props.product}
                handleChange={this.props.setProduct}
              />
              <iframe src="http://bl.ocks.org/mbostock/raw/7341714/"></iframe>
            </div>

            <div className="eight wide column">
              <ProductDropdown
                product={this.props.product}
                handleChange={this.props.setProduct}
              />
              <iframe src="http://bl.ocks.org/mbostock/raw/7341714/"></iframe>
            </div>
          </div>

        </div>

      </div>
    );
  },

  countyLineFilter: function(location) {
    return getStateFIPS(location.id) == this.props.selected_state;
  }

});

const mapStateToProps = (state) => ({
  product:         state.get('product'),
  product_data:    getDataForQuery(state.get('product')),
  selected:        state.get('selected'),
  selected_state:  getStateFIPS(state.get('selected')),
  label:           getLabel(state),
  detail_level:    state.get('detail')
});

export const Main = connect(mapStateToProps, actionCreators)(MainNaked);


