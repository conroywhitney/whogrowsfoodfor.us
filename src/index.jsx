import React           from 'react';
import ReactDOM        from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore}   from 'redux';
import {Provider}      from 'react-redux';
import reducer         from './reducer';
import App             from './components/App';
import {Main}          from './components/Main';

require('./style.css');

const store = createStore(reducer);

const routes = <Route component={App}>
  <Route path="/" component={Main} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

