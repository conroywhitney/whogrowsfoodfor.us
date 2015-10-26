import React                                     from 'react';
import ReactDOM                                  from 'react-dom';
import Router, {Route}                           from 'react-router';
import {Provider}                                from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState }                from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor }      from 'redux-devtools/lib/react';
import reducer                                   from './reducer';
import Layout                                    from './layouts/Layout';
import {Main}                                    from './views/Main';

// https://github.com/gaearon/redux-devtools
const finalCreateStore = compose(
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducer);

const routes = <Route component={Layout}>
  <Route path="/" component={Main} />
</Route>;

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>
    { true ?
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
    : null }
  </div>,
  document.getElementById('app')
);

