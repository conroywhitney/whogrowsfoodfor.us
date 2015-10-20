import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  getTitle: function() {
    return this.props.label || "";
  },

  render: function() {
    return <div className="title">
      {this.getTitle()}
    </div>;
  }

});
