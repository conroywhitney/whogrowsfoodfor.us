import React from 'react';

export default React.createClass({
  getLabel: function() {
    return this.props.label || "";
  },
  render: function() {
    return <div className="title">
      {this.getLabel()}
    </div>;
  }
});
