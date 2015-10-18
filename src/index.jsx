import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/Title';
import BivariateMap from './components/BivariateMap';

const label = "SOME LABEL";

ReactDOM.render(
  <Title label={label} />,
  document.getElementById('title')
);

ReactDOM.render(
  <BivariateMap />,
  document.getElementById('map')
);
