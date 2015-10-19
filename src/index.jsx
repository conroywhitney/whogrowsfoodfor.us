import React           from 'react';
import ReactDOM        from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore}   from 'redux';
import {Provider}      from 'react-redux';
import reducer         from './reducer';
import Layout          from './layouts/Layout';
import {Main}          from './views/Main';

const store   = createStore(reducer);

const routes = <Route component={Layout}>
  <Route path="/" component={Main} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

