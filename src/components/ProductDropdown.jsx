import {Map, List, fromJS} from 'immutable';
import React            from 'react';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import {connect}        from 'react-redux';
import Select           from 'react-select';
import {productOptions} from '../products.js';

export default  React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="product dropdown">
      <Select
          name="product-dropdown"
          value={this.props.product}
          options={productOptions}
          onChange={this.logChange}
          className="ui dropdown"
      />
    </div>;
  },

  logChange: function(newValue, selectedOptions) {
    console.log("dropdown changed");
    console.log(newValue);
    console.log(selectedOptions);
  }

});
