import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/Title';
import BivariateMap from './components/BivariateMap';

require('./style.css');

const label = "SOME LABEL";

ReactDOM.render(
  <Title label={label} />,
  document.getElementById('title')
);

ReactDOM.render(
  <BivariateMap
    width="960"
    height="500"
  />,
  document.getElementById('map')
);