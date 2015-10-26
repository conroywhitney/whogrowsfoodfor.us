import React           from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Title           from './Title';
import BivariateMap    from './BivariateMap';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    console.log('map container : render');
    console.log(this.props.productData);
    return <div className="map-container">
      <Title label={this.props.label} />
      <BivariateMap
        width="960"
        height="500"
        productData={this.props.productData}
        detailLevel={this.props.detailLevel}
        setRegion={this.props.setRegion}
        selectedFIPS={this.props.selected}
        countyLineFilter={this.props.countyLineFilter}
      />
    </div>;
  }

});
