import React from 'react';

export default React.createClass({
  render: function() {
    return <div className="ui container" ref="layout">
      {this.props.children}
    </div>;
  }
});
