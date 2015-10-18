import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/Title';

const label = "SOME LABEL";

ReactDOM.render(
  <Title label={label} />,
  document.getElementById('app')
);

