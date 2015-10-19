import {Map, List, fromJS} from 'immutable';
import React           from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect}       from 'react-redux';
import Select          from 'react-select';

export const ProductDropdownNaked = React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount: function() {
    this.options = this.props.products.map(
      p => ({value: p.key, label: p.name})
    );

    console.log("component will mount duh");
    console.log(options);
  },

  render: function() {
    return <div className="product dropdown">
      <Select
          name="product-dropdown"
          value={this.props.product}
          options={this.options}
          onChange={this.onChange}
      />
    </div>;
  },

  onChange: function() {
    console.log("changing dropdown");
  }

});

function mapStateToProps(state) {
  return {
    product:  state.get('product'),
    products: state.getIn(['data', 'products'])
  };
}

export const ProductDropdown = connect(mapStateToProps)(ProductDropdownNaked);
