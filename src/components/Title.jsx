import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  getLabel: function() {
    return this.props.label || "";
  },
  render: function() {
    return <div className="title">
      {'Map of ' + this.getLabel()}
    </div>;
  }
});
