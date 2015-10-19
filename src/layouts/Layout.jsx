import React from 'react';
import '../styles/style.css';

export default React.createClass({
  render: function() {
    return <div className="ui container">
      {this.props.children}
    </div>;
  }
});
