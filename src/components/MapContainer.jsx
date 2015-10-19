import React           from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect}       from 'react-redux';
import Title           from './Title';
import BivariateMap    from './BivariateMap';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="map-container">
      <Title label={this.props.label} />
      <BivariateMap width="960" height="500"/>
    </div>;
  }

});
