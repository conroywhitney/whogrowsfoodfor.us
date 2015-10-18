/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _store = __webpack_require__(2);

	var store = (0, _store.makeStore)();
	exports.store = store;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = makeStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _redux = __webpack_require__(3);

	var _reducer = __webpack_require__(13);

	var _reducer2 = _interopRequireDefault(_reducer);

	function makeStore() {
	  return (0, _redux.createStore)(_reducer2['default']);
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(4);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(6);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(10);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(11);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(12);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(5);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);

	    return function unsubscribe() {
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(4);

	var _utilsIsPlainObject = __webpack_require__(5);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsMapValues = __webpack_require__(8);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(9);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_utilsIsPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */

	function combineReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var newState = reducer(state[key], action);
	      if (typeof newState === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      return newState;
	    });

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return finalState;
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(8);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    // eslint-disable-line no-eq-null
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(12);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = reducer;

	var _core = __webpack_require__(14);

	function reducer(state, action) {
		if (!state) {
			return _core.INITIAL_STATE;
		}
		if (!action) {
			return state;
		}

		// Figure out which function to call and call it
		switch (action.type) {
			case 'SELECT':
				return (0, _core.select)(state, action.fips);
		}
		// return unaltered state if we don't recognize the action
		return state;
	}

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.select = select;

	var _immutable = __webpack_require__(15);

	var _srcFips = __webpack_require__(16);

	var _srcZoom = __webpack_require__(17);

	var _srcLabel = __webpack_require__(18);

	var INITIAL_STATE = (0, _immutable.fromJS)({
	  crop: null,
	  stat: null,
	  selected: null,
	  zoom: null,
	  detail: ['land', 'states'],
	  histograms: [],
	  label: _srcLabel.DEFAULT_LABEL,
	  data: {
	    labels: __webpack_require__(19)
	  }
	});

	exports.INITIAL_STATE = INITIAL_STATE;

	function select(state, fips) {
	  var fips = (0, _srcFips.normalizeFIPS)(fips);
	  return state.set('selected', fips).set('detail', state.get('detail').push('counties')).set('zoom', (0, _srcZoom.getZoomXYZ)(fips)).set('label', (0, _srcLabel.getLabel)(state, fips));
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.Immutable = factory()
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    // However note that we're currently calling ToNumber() instead of ToUint32()
	    // which should be improved in the future, as floating point numbers should
	    // not be accepted as an array index.
	    if (typeof index !== 'number') {
	      var numIndex = +index;
	      if ('' + numIndex !== index) {
	        return NaN;
	      }
	      index = numIndex;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function src_Iterator__Iterator(next) {
	      this.next = next;
	    }

	    src_Iterator__Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  src_Iterator__Iterator.KEYS = ITERATE_KEYS;
	  src_Iterator__Iterator.VALUES = ITERATE_VALUES;
	  src_Iterator__Iterator.ENTRIES = ITERATE_ENTRIES;

	  src_Iterator__Iterator.prototype.inspect =
	  src_Iterator__Iterator.prototype.toSource = function () { return this.toString(); }
	  src_Iterator__Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  // #pragma Root Sequences

	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new src_Iterator__Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  var src_Math__imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    return hashJSObj(o);
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new src_Iterator__Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = src_Map__Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : src_Map__Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new src_Iterator__Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new src_Iterator__Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new src_Iterator__Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(src_Map__Map, KeyedCollection);

	    // @pragma Construction

	    function src_Map__Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) && !isOrdered(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    src_Map__Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    src_Map__Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    src_Map__Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    src_Map__Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    src_Map__Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    src_Map__Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    src_Map__Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    src_Map__Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    src_Map__Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    src_Map__Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    src_Map__Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    src_Map__Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    src_Map__Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger(undefined), arguments);
	    };

	    src_Map__Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMerger(merger), iters);
	    };

	    src_Map__Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    src_Map__Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    src_Map__Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    src_Map__Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    src_Map__Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    src_Map__Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    src_Map__Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    src_Map__Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    src_Map__Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    src_Map__Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  src_Map__Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = src_Map__Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, src_Iterator__Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(merger) {
	    return function(existing, value, key) 
	      {return existing && existing.mergeDeepWith && isIterable(value) ?
	        existing.mergeDeepWith(merger, value) :
	        merger ? merger(existing, value, key) : value};
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index >= 0 && index < this.size) {
	        index += this._origin;
	        var node = listNodeFor(this, index);
	        return node && node.array[index & MASK];
	      }
	      return notSetValue;
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger(undefined), arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMerger(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }

	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	          return this;
	        }
	      }

	      var editable = editableVNode(this, ownerID);
	      editable.array.splice(sizeIndex + 1);
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, src_Map__Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new src_Iterator__Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  createClass(src_Set__Set, SetCollection);

	    // @pragma Construction

	    function src_Set__Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) && !isOrdered(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    src_Set__Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    src_Set__Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    src_Set__Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    src_Set__Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    src_Set__Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    src_Set__Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    src_Set__Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    src_Set__Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    src_Set__Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    src_Set__Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    src_Set__Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    src_Set__Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    src_Set__Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    src_Set__Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    src_Set__Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    src_Set__Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    src_Set__Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    src_Set__Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  src_Set__Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = src_Set__Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, src_Set__Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = src_Map__Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step > 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new src_Iterator__Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = src_Iterator__Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return src_Map__Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return src_Set__Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    findEntry: function(predicate, context) {
	      var found;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findLastEntry: function(predicate, context) {
	      return this.toSeq().reverse().findEntry(predicate, context);
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  // Temporary warning about using length
	  (function () {
	    try {
	      Object.defineProperty(IterablePrototype, 'length', {
	        get: function () {
	          if (!Iterable.noLengthWarning) {
	            var stack;
	            try {
	              throw new Error();
	            } catch (error) {
	              stack = error.stack;
	            }
	            if (stack.indexOf('_wrapObject') === -1) {
	              console && console.warn && console.warn(
	                'iterable.length has been deprecated, '+
	                'use iterable.size or iterable.count(). '+
	                'This warning will become a silent error in a future version. ' +
	                stack
	              );
	              return this.size;
	            }
	          }
	        }
	      });
	    } catch (e) {}
	  })();



	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLastKey: function(predicate, context) {
	      return this.toSeq().reverse().findKey(predicate, context);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    lastKeyOf: function(searchValue) {
	      return this.findLastKey(function(value ) {return is(value, searchValue)});
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.toKeyedSeq().keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      return this.toSeq().reverse().indexOf(searchValue);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var key = this.toKeyedSeq().findLastKey(predicate, context);
	      return key === undefined ? -1 : key;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : value;
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = src_Math__imul(h, 0xCC9E2D51);
	    h = src_Math__imul(h << 15 | h >>> -15, 0x1B873593);
	    h = src_Math__imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = src_Math__imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = src_Math__imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: src_Map__Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: src_Set__Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;

	}));

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getStateFIPS = getStateFIPS;
	exports.normalizeFIPS = normalizeFIPS;

	function getStateFIPS(string) {
	  // FIPS codes are in the thousands
	  // Starting with Alabama at 01000
	  // and ending with Puerto Rico at 72000
	  // A specific county will be a subset, like 01024
	  // So can find state by rounding to nearest 1,000
	  // Note: notice the prepending 0 on there
	  if (string > 0) {
	    var fips_int = parseInt(string),
	        fips_floor = Math.floor(fips_int / 1000) * 1000,
	        fips_string = normalizeFIPS(fips_floor);
	    return fips_string;
	  } else {
	    return null;
	  }
	}

	function normalizeFIPS(number) {
	  if (number !== null && number >= 0 && number <= 99999) {
	    return ("00000" + number).slice(-5);
	  } else {
	    return null;
	  }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getZoomXYZ = getZoomXYZ;

	var _immutable = __webpack_require__(15);

	function getZoomXYZ(zoomFIPS) {
	  if (!zoomFIPS) {
	    return null;
	  }
	  // TODO: once have UI, find out boundary coordinates of path for FIPS
	  return (0, _immutable.List)([1, 2, 3]);
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.getLabel = getLabel;
	var DEFAULT_LABEL = "United States of America";

	exports.DEFAULT_LABEL = DEFAULT_LABEL;

	function getLabel(state, fips) {
		if (!state) {
			return null;
		}
		return state.getIn(['data', 'labels', fips, 'long']) || DEFAULT_LABEL;
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {
		"10000": {
			"short": "DE",
			"long": "Delaware"
		},
		"10001": {
			"short": "Kent",
			"long": "Kent County, DE"
		},
		"10003": {
			"short": "New Castle",
			"long": "New Castle County, DE"
		},
		"10005": {
			"short": "Sussex",
			"long": "Sussex County, DE"
		},
		"11000": {
			"short": "DC",
			"long": "District of Columbia"
		},
		"11001": {
			"short": "District of Columbia",
			"long": "District of Columbia, DC"
		},
		"12000": {
			"short": "FL",
			"long": "Florida"
		},
		"12001": {
			"short": "Alachua",
			"long": "Alachua County, FL"
		},
		"12003": {
			"short": "Baker",
			"long": "Baker County, FL"
		},
		"12005": {
			"short": "Bay",
			"long": "Bay County, FL"
		},
		"12007": {
			"short": "Bradford",
			"long": "Bradford County, FL"
		},
		"12009": {
			"short": "Brevard",
			"long": "Brevard County, FL"
		},
		"12011": {
			"short": "Broward",
			"long": "Broward County, FL"
		},
		"12013": {
			"short": "Calhoun",
			"long": "Calhoun County, FL"
		},
		"12015": {
			"short": "Charlotte",
			"long": "Charlotte County, FL"
		},
		"12017": {
			"short": "Citrus",
			"long": "Citrus County, FL"
		},
		"12019": {
			"short": "Clay",
			"long": "Clay County, FL"
		},
		"12021": {
			"short": "Collier",
			"long": "Collier County, FL"
		},
		"12023": {
			"short": "Columbia",
			"long": "Columbia County, FL"
		},
		"12027": {
			"short": "DeSoto",
			"long": "DeSoto County, FL"
		},
		"12029": {
			"short": "Dixie",
			"long": "Dixie County, FL"
		},
		"12031": {
			"short": "Duval",
			"long": "Duval County, FL"
		},
		"12033": {
			"short": "Escambia",
			"long": "Escambia County, FL"
		},
		"12035": {
			"short": "Flagler",
			"long": "Flagler County, FL"
		},
		"12037": {
			"short": "Franklin",
			"long": "Franklin County, FL"
		},
		"12039": {
			"short": "Gadsden",
			"long": "Gadsden County, FL"
		},
		"12041": {
			"short": "Gilchrist",
			"long": "Gilchrist County, FL"
		},
		"12043": {
			"short": "Glades",
			"long": "Glades County, FL"
		},
		"12045": {
			"short": "Gulf",
			"long": "Gulf County, FL"
		},
		"12047": {
			"short": "Hamilton",
			"long": "Hamilton County, FL"
		},
		"12049": {
			"short": "Hardee",
			"long": "Hardee County, FL"
		},
		"12051": {
			"short": "Hendry",
			"long": "Hendry County, FL"
		},
		"12053": {
			"short": "Hernando",
			"long": "Hernando County, FL"
		},
		"12055": {
			"short": "Highlands",
			"long": "Highlands County, FL"
		},
		"12057": {
			"short": "Hillsborough",
			"long": "Hillsborough County, FL"
		},
		"12059": {
			"short": "Holmes",
			"long": "Holmes County, FL"
		},
		"12061": {
			"short": "Indian River",
			"long": "Indian River County, FL"
		},
		"12063": {
			"short": "Jackson",
			"long": "Jackson County, FL"
		},
		"12065": {
			"short": "Jefferson",
			"long": "Jefferson County, FL"
		},
		"12067": {
			"short": "Lafayette",
			"long": "Lafayette County, FL"
		},
		"12069": {
			"short": "Lake",
			"long": "Lake County, FL"
		},
		"12071": {
			"short": "Lee",
			"long": "Lee County, FL"
		},
		"12073": {
			"short": "Leon",
			"long": "Leon County, FL"
		},
		"12075": {
			"short": "Levy",
			"long": "Levy County, FL"
		},
		"12077": {
			"short": "Liberty",
			"long": "Liberty County, FL"
		},
		"12079": {
			"short": "Madison",
			"long": "Madison County, FL"
		},
		"12081": {
			"short": "Manatee",
			"long": "Manatee County, FL"
		},
		"12083": {
			"short": "Marion",
			"long": "Marion County, FL"
		},
		"12085": {
			"short": "Martin",
			"long": "Martin County, FL"
		},
		"12086": {
			"short": "Miami-Dade",
			"long": "Miami-Dade County, FL"
		},
		"12087": {
			"short": "Monroe",
			"long": "Monroe County, FL"
		},
		"12089": {
			"short": "Nassau",
			"long": "Nassau County, FL"
		},
		"12091": {
			"short": "Okaloosa",
			"long": "Okaloosa County, FL"
		},
		"12093": {
			"short": "Okeechobee",
			"long": "Okeechobee County, FL"
		},
		"12095": {
			"short": "Orange",
			"long": "Orange County, FL"
		},
		"12097": {
			"short": "Osceola",
			"long": "Osceola County, FL"
		},
		"12099": {
			"short": "Palm Beach",
			"long": "Palm Beach County, FL"
		},
		"12101": {
			"short": "Pasco",
			"long": "Pasco County, FL"
		},
		"12103": {
			"short": "Pinellas",
			"long": "Pinellas County, FL"
		},
		"12105": {
			"short": "Polk",
			"long": "Polk County, FL"
		},
		"12107": {
			"short": "Putnam",
			"long": "Putnam County, FL"
		},
		"12109": {
			"short": "St. Johns",
			"long": "St. Johns County, FL"
		},
		"12111": {
			"short": "St. Lucie",
			"long": "St. Lucie County, FL"
		},
		"12113": {
			"short": "Santa Rosa",
			"long": "Santa Rosa County, FL"
		},
		"12115": {
			"short": "Sarasota",
			"long": "Sarasota County, FL"
		},
		"12117": {
			"short": "Seminole",
			"long": "Seminole County, FL"
		},
		"12119": {
			"short": "Sumter",
			"long": "Sumter County, FL"
		},
		"12121": {
			"short": "Suwannee",
			"long": "Suwannee County, FL"
		},
		"12123": {
			"short": "Taylor",
			"long": "Taylor County, FL"
		},
		"12125": {
			"short": "Union",
			"long": "Union County, FL"
		},
		"12127": {
			"short": "Volusia",
			"long": "Volusia County, FL"
		},
		"12129": {
			"short": "Wakulla",
			"long": "Wakulla County, FL"
		},
		"12131": {
			"short": "Walton",
			"long": "Walton County, FL"
		},
		"12133": {
			"short": "Washington",
			"long": "Washington County, FL"
		},
		"13000": {
			"short": "GA",
			"long": "Georgia"
		},
		"13001": {
			"short": "Appling",
			"long": "Appling County, GA"
		},
		"13003": {
			"short": "Atkinson",
			"long": "Atkinson County, GA"
		},
		"13005": {
			"short": "Bacon",
			"long": "Bacon County, GA"
		},
		"13007": {
			"short": "Baker",
			"long": "Baker County, GA"
		},
		"13009": {
			"short": "Baldwin",
			"long": "Baldwin County, GA"
		},
		"13011": {
			"short": "Banks",
			"long": "Banks County, GA"
		},
		"13013": {
			"short": "Barrow",
			"long": "Barrow County, GA"
		},
		"13015": {
			"short": "Bartow",
			"long": "Bartow County, GA"
		},
		"13017": {
			"short": "Ben Hill",
			"long": "Ben Hill County, GA"
		},
		"13019": {
			"short": "Berrien",
			"long": "Berrien County, GA"
		},
		"13021": {
			"short": "Bibb",
			"long": "Bibb County, GA"
		},
		"13023": {
			"short": "Bleckley",
			"long": "Bleckley County, GA"
		},
		"13025": {
			"short": "Brantley",
			"long": "Brantley County, GA"
		},
		"13027": {
			"short": "Brooks",
			"long": "Brooks County, GA"
		},
		"13029": {
			"short": "Bryan",
			"long": "Bryan County, GA"
		},
		"13031": {
			"short": "Bulloch",
			"long": "Bulloch County, GA"
		},
		"13033": {
			"short": "Burke",
			"long": "Burke County, GA"
		},
		"13035": {
			"short": "Butts",
			"long": "Butts County, GA"
		},
		"13037": {
			"short": "Calhoun",
			"long": "Calhoun County, GA"
		},
		"13039": {
			"short": "Camden",
			"long": "Camden County, GA"
		},
		"13043": {
			"short": "Candler",
			"long": "Candler County, GA"
		},
		"13045": {
			"short": "Carroll",
			"long": "Carroll County, GA"
		},
		"13047": {
			"short": "Catoosa",
			"long": "Catoosa County, GA"
		},
		"13049": {
			"short": "Charlton",
			"long": "Charlton County, GA"
		},
		"13051": {
			"short": "Chatham",
			"long": "Chatham County, GA"
		},
		"13053": {
			"short": "Chattahoochee",
			"long": "Chattahoochee County, GA"
		},
		"13055": {
			"short": "Chattooga",
			"long": "Chattooga County, GA"
		},
		"13057": {
			"short": "Cherokee",
			"long": "Cherokee County, GA"
		},
		"13059": {
			"short": "Clarke",
			"long": "Clarke County, GA"
		},
		"13061": {
			"short": "Clay",
			"long": "Clay County, GA"
		},
		"13063": {
			"short": "Clayton",
			"long": "Clayton County, GA"
		},
		"13065": {
			"short": "Clinch",
			"long": "Clinch County, GA"
		},
		"13067": {
			"short": "Cobb",
			"long": "Cobb County, GA"
		},
		"13069": {
			"short": "Coffee",
			"long": "Coffee County, GA"
		},
		"13071": {
			"short": "Colquitt",
			"long": "Colquitt County, GA"
		},
		"13073": {
			"short": "Columbia",
			"long": "Columbia County, GA"
		},
		"13075": {
			"short": "Cook",
			"long": "Cook County, GA"
		},
		"13077": {
			"short": "Coweta",
			"long": "Coweta County, GA"
		},
		"13079": {
			"short": "Crawford",
			"long": "Crawford County, GA"
		},
		"13081": {
			"short": "Crisp",
			"long": "Crisp County, GA"
		},
		"13083": {
			"short": "Dade",
			"long": "Dade County, GA"
		},
		"13085": {
			"short": "Dawson",
			"long": "Dawson County, GA"
		},
		"13087": {
			"short": "Decatur",
			"long": "Decatur County, GA"
		},
		"13089": {
			"short": "DeKalb",
			"long": "DeKalb County, GA"
		},
		"13091": {
			"short": "Dodge",
			"long": "Dodge County, GA"
		},
		"13093": {
			"short": "Dooly",
			"long": "Dooly County, GA"
		},
		"13095": {
			"short": "Dougherty",
			"long": "Dougherty County, GA"
		},
		"13097": {
			"short": "Douglas",
			"long": "Douglas County, GA"
		},
		"13099": {
			"short": "Early",
			"long": "Early County, GA"
		},
		"13101": {
			"short": "Echols",
			"long": "Echols County, GA"
		},
		"13103": {
			"short": "Effingham",
			"long": "Effingham County, GA"
		},
		"13105": {
			"short": "Elbert",
			"long": "Elbert County, GA"
		},
		"13107": {
			"short": "Emanuel",
			"long": "Emanuel County, GA"
		},
		"13109": {
			"short": "Evans",
			"long": "Evans County, GA"
		},
		"13111": {
			"short": "Fannin",
			"long": "Fannin County, GA"
		},
		"13113": {
			"short": "Fayette",
			"long": "Fayette County, GA"
		},
		"13115": {
			"short": "Floyd",
			"long": "Floyd County, GA"
		},
		"13117": {
			"short": "Forsyth",
			"long": "Forsyth County, GA"
		},
		"13119": {
			"short": "Franklin",
			"long": "Franklin County, GA"
		},
		"13121": {
			"short": "Fulton",
			"long": "Fulton County, GA"
		},
		"13123": {
			"short": "Gilmer",
			"long": "Gilmer County, GA"
		},
		"13125": {
			"short": "Glascock",
			"long": "Glascock County, GA"
		},
		"13127": {
			"short": "Glynn",
			"long": "Glynn County, GA"
		},
		"13129": {
			"short": "Gordon",
			"long": "Gordon County, GA"
		},
		"13131": {
			"short": "Grady",
			"long": "Grady County, GA"
		},
		"13133": {
			"short": "Greene",
			"long": "Greene County, GA"
		},
		"13135": {
			"short": "Gwinnett",
			"long": "Gwinnett County, GA"
		},
		"13137": {
			"short": "Habersham",
			"long": "Habersham County, GA"
		},
		"13139": {
			"short": "Hall",
			"long": "Hall County, GA"
		},
		"13141": {
			"short": "Hancock",
			"long": "Hancock County, GA"
		},
		"13143": {
			"short": "Haralson",
			"long": "Haralson County, GA"
		},
		"13145": {
			"short": "Harris",
			"long": "Harris County, GA"
		},
		"13147": {
			"short": "Hart",
			"long": "Hart County, GA"
		},
		"13149": {
			"short": "Heard",
			"long": "Heard County, GA"
		},
		"13151": {
			"short": "Henry",
			"long": "Henry County, GA"
		},
		"13153": {
			"short": "Houston",
			"long": "Houston County, GA"
		},
		"13155": {
			"short": "Irwin",
			"long": "Irwin County, GA"
		},
		"13157": {
			"short": "Jackson",
			"long": "Jackson County, GA"
		},
		"13159": {
			"short": "Jasper",
			"long": "Jasper County, GA"
		},
		"13161": {
			"short": "Jeff Davis",
			"long": "Jeff Davis County, GA"
		},
		"13163": {
			"short": "Jefferson",
			"long": "Jefferson County, GA"
		},
		"13165": {
			"short": "Jenkins",
			"long": "Jenkins County, GA"
		},
		"13167": {
			"short": "Johnson",
			"long": "Johnson County, GA"
		},
		"13169": {
			"short": "Jones",
			"long": "Jones County, GA"
		},
		"13171": {
			"short": "Lamar",
			"long": "Lamar County, GA"
		},
		"13173": {
			"short": "Lanier",
			"long": "Lanier County, GA"
		},
		"13175": {
			"short": "Laurens",
			"long": "Laurens County, GA"
		},
		"13177": {
			"short": "Lee",
			"long": "Lee County, GA"
		},
		"13179": {
			"short": "Liberty",
			"long": "Liberty County, GA"
		},
		"13181": {
			"short": "Lincoln",
			"long": "Lincoln County, GA"
		},
		"13183": {
			"short": "Long",
			"long": "Long County, GA"
		},
		"13185": {
			"short": "Lowndes",
			"long": "Lowndes County, GA"
		},
		"13187": {
			"short": "Lumpkin",
			"long": "Lumpkin County, GA"
		},
		"13189": {
			"short": "McDuffie",
			"long": "McDuffie County, GA"
		},
		"13191": {
			"short": "McIntosh",
			"long": "McIntosh County, GA"
		},
		"13193": {
			"short": "Macon",
			"long": "Macon County, GA"
		},
		"13195": {
			"short": "Madison",
			"long": "Madison County, GA"
		},
		"13197": {
			"short": "Marion",
			"long": "Marion County, GA"
		},
		"13199": {
			"short": "Meriwether",
			"long": "Meriwether County, GA"
		},
		"13201": {
			"short": "Miller",
			"long": "Miller County, GA"
		},
		"13205": {
			"short": "Mitchell",
			"long": "Mitchell County, GA"
		},
		"13207": {
			"short": "Monroe",
			"long": "Monroe County, GA"
		},
		"13209": {
			"short": "Montgomery",
			"long": "Montgomery County, GA"
		},
		"13211": {
			"short": "Morgan",
			"long": "Morgan County, GA"
		},
		"13213": {
			"short": "Murray",
			"long": "Murray County, GA"
		},
		"13215": {
			"short": "Muscogee",
			"long": "Muscogee County, GA"
		},
		"13217": {
			"short": "Newton",
			"long": "Newton County, GA"
		},
		"13219": {
			"short": "Oconee",
			"long": "Oconee County, GA"
		},
		"13221": {
			"short": "Oglethorpe",
			"long": "Oglethorpe County, GA"
		},
		"13223": {
			"short": "Paulding",
			"long": "Paulding County, GA"
		},
		"13225": {
			"short": "Peach",
			"long": "Peach County, GA"
		},
		"13227": {
			"short": "Pickens",
			"long": "Pickens County, GA"
		},
		"13229": {
			"short": "Pierce",
			"long": "Pierce County, GA"
		},
		"13231": {
			"short": "Pike",
			"long": "Pike County, GA"
		},
		"13233": {
			"short": "Polk",
			"long": "Polk County, GA"
		},
		"13235": {
			"short": "Pulaski",
			"long": "Pulaski County, GA"
		},
		"13237": {
			"short": "Putnam",
			"long": "Putnam County, GA"
		},
		"13239": {
			"short": "Quitman",
			"long": "Quitman County, GA"
		},
		"13241": {
			"short": "Rabun",
			"long": "Rabun County, GA"
		},
		"13243": {
			"short": "Randolph",
			"long": "Randolph County, GA"
		},
		"13245": {
			"short": "Richmond",
			"long": "Richmond County, GA"
		},
		"13247": {
			"short": "Rockdale",
			"long": "Rockdale County, GA"
		},
		"13249": {
			"short": "Schley",
			"long": "Schley County, GA"
		},
		"13251": {
			"short": "Screven",
			"long": "Screven County, GA"
		},
		"13253": {
			"short": "Seminole",
			"long": "Seminole County, GA"
		},
		"13255": {
			"short": "Spalding",
			"long": "Spalding County, GA"
		},
		"13257": {
			"short": "Stephens",
			"long": "Stephens County, GA"
		},
		"13259": {
			"short": "Stewart",
			"long": "Stewart County, GA"
		},
		"13261": {
			"short": "Sumter",
			"long": "Sumter County, GA"
		},
		"13263": {
			"short": "Talbot",
			"long": "Talbot County, GA"
		},
		"13265": {
			"short": "Taliaferro",
			"long": "Taliaferro County, GA"
		},
		"13267": {
			"short": "Tattnall",
			"long": "Tattnall County, GA"
		},
		"13269": {
			"short": "Taylor",
			"long": "Taylor County, GA"
		},
		"13271": {
			"short": "Telfair",
			"long": "Telfair County, GA"
		},
		"13273": {
			"short": "Terrell",
			"long": "Terrell County, GA"
		},
		"13275": {
			"short": "Thomas",
			"long": "Thomas County, GA"
		},
		"13277": {
			"short": "Tift",
			"long": "Tift County, GA"
		},
		"13279": {
			"short": "Toombs",
			"long": "Toombs County, GA"
		},
		"13281": {
			"short": "Towns",
			"long": "Towns County, GA"
		},
		"13283": {
			"short": "Treutlen",
			"long": "Treutlen County, GA"
		},
		"13285": {
			"short": "Troup",
			"long": "Troup County, GA"
		},
		"13287": {
			"short": "Turner",
			"long": "Turner County, GA"
		},
		"13289": {
			"short": "Twiggs",
			"long": "Twiggs County, GA"
		},
		"13291": {
			"short": "Union",
			"long": "Union County, GA"
		},
		"13293": {
			"short": "Upson",
			"long": "Upson County, GA"
		},
		"13295": {
			"short": "Walker",
			"long": "Walker County, GA"
		},
		"13297": {
			"short": "Walton",
			"long": "Walton County, GA"
		},
		"13299": {
			"short": "Ware",
			"long": "Ware County, GA"
		},
		"13301": {
			"short": "Warren",
			"long": "Warren County, GA"
		},
		"13303": {
			"short": "Washington",
			"long": "Washington County, GA"
		},
		"13305": {
			"short": "Wayne",
			"long": "Wayne County, GA"
		},
		"13307": {
			"short": "Webster",
			"long": "Webster County, GA"
		},
		"13309": {
			"short": "Wheeler",
			"long": "Wheeler County, GA"
		},
		"13311": {
			"short": "White",
			"long": "White County, GA"
		},
		"13313": {
			"short": "Whitfield",
			"long": "Whitfield County, GA"
		},
		"13315": {
			"short": "Wilcox",
			"long": "Wilcox County, GA"
		},
		"13317": {
			"short": "Wilkes",
			"long": "Wilkes County, GA"
		},
		"13319": {
			"short": "Wilkinson",
			"long": "Wilkinson County, GA"
		},
		"13321": {
			"short": "Worth",
			"long": "Worth County, GA"
		},
		"15000": {
			"short": "HI",
			"long": "Hawaii"
		},
		"15001": {
			"short": "Hawaii",
			"long": "Hawaii County, HI"
		},
		"15003": {
			"short": "Honolulu",
			"long": "Honolulu County, HI"
		},
		"15005": {
			"short": "Kalawao",
			"long": "Kalawao County, HI"
		},
		"15007": {
			"short": "Kauai",
			"long": "Kauai County, HI"
		},
		"15009": {
			"short": "Maui",
			"long": "Maui County, HI"
		},
		"16000": {
			"short": "ID",
			"long": "Idaho"
		},
		"16001": {
			"short": "Ada",
			"long": "Ada County, ID"
		},
		"16003": {
			"short": "Adams",
			"long": "Adams County, ID"
		},
		"16005": {
			"short": "Bannock",
			"long": "Bannock County, ID"
		},
		"16007": {
			"short": "Bear Lake",
			"long": "Bear Lake County, ID"
		},
		"16009": {
			"short": "Benewah",
			"long": "Benewah County, ID"
		},
		"16011": {
			"short": "Bingham",
			"long": "Bingham County, ID"
		},
		"16013": {
			"short": "Blaine",
			"long": "Blaine County, ID"
		},
		"16015": {
			"short": "Boise",
			"long": "Boise County, ID"
		},
		"16017": {
			"short": "Bonner",
			"long": "Bonner County, ID"
		},
		"16019": {
			"short": "Bonneville",
			"long": "Bonneville County, ID"
		},
		"16021": {
			"short": "Boundary",
			"long": "Boundary County, ID"
		},
		"16023": {
			"short": "Butte",
			"long": "Butte County, ID"
		},
		"16025": {
			"short": "Camas",
			"long": "Camas County, ID"
		},
		"16027": {
			"short": "Canyon",
			"long": "Canyon County, ID"
		},
		"16029": {
			"short": "Caribou",
			"long": "Caribou County, ID"
		},
		"16031": {
			"short": "Cassia",
			"long": "Cassia County, ID"
		},
		"16033": {
			"short": "Clark",
			"long": "Clark County, ID"
		},
		"16035": {
			"short": "Clearwater",
			"long": "Clearwater County, ID"
		},
		"16037": {
			"short": "Custer",
			"long": "Custer County, ID"
		},
		"16039": {
			"short": "Elmore",
			"long": "Elmore County, ID"
		},
		"16041": {
			"short": "Franklin",
			"long": "Franklin County, ID"
		},
		"16043": {
			"short": "Fremont",
			"long": "Fremont County, ID"
		},
		"16045": {
			"short": "Gem",
			"long": "Gem County, ID"
		},
		"16047": {
			"short": "Gooding",
			"long": "Gooding County, ID"
		},
		"16049": {
			"short": "Idaho",
			"long": "Idaho County, ID"
		},
		"16051": {
			"short": "Jefferson",
			"long": "Jefferson County, ID"
		},
		"16053": {
			"short": "Jerome",
			"long": "Jerome County, ID"
		},
		"16055": {
			"short": "Kootenai",
			"long": "Kootenai County, ID"
		},
		"16057": {
			"short": "Latah",
			"long": "Latah County, ID"
		},
		"16059": {
			"short": "Lemhi",
			"long": "Lemhi County, ID"
		},
		"16061": {
			"short": "Lewis",
			"long": "Lewis County, ID"
		},
		"16063": {
			"short": "Lincoln",
			"long": "Lincoln County, ID"
		},
		"16065": {
			"short": "Madison",
			"long": "Madison County, ID"
		},
		"16067": {
			"short": "Minidoka",
			"long": "Minidoka County, ID"
		},
		"16069": {
			"short": "Nez Perce",
			"long": "Nez Perce County, ID"
		},
		"16071": {
			"short": "Oneida",
			"long": "Oneida County, ID"
		},
		"16073": {
			"short": "Owyhee",
			"long": "Owyhee County, ID"
		},
		"16075": {
			"short": "Payette",
			"long": "Payette County, ID"
		},
		"16077": {
			"short": "Power",
			"long": "Power County, ID"
		},
		"16079": {
			"short": "Shoshone",
			"long": "Shoshone County, ID"
		},
		"16081": {
			"short": "Teton",
			"long": "Teton County, ID"
		},
		"16083": {
			"short": "Twin Falls",
			"long": "Twin Falls County, ID"
		},
		"16085": {
			"short": "Valley",
			"long": "Valley County, ID"
		},
		"16087": {
			"short": "Washington",
			"long": "Washington County, ID"
		},
		"17000": {
			"short": "IL",
			"long": "Illinois"
		},
		"17001": {
			"short": "Adams",
			"long": "Adams County, IL"
		},
		"17003": {
			"short": "Alexander",
			"long": "Alexander County, IL"
		},
		"17005": {
			"short": "Bond",
			"long": "Bond County, IL"
		},
		"17007": {
			"short": "Boone",
			"long": "Boone County, IL"
		},
		"17009": {
			"short": "Brown",
			"long": "Brown County, IL"
		},
		"17011": {
			"short": "Bureau",
			"long": "Bureau County, IL"
		},
		"17013": {
			"short": "Calhoun",
			"long": "Calhoun County, IL"
		},
		"17015": {
			"short": "Carroll",
			"long": "Carroll County, IL"
		},
		"17017": {
			"short": "Cass",
			"long": "Cass County, IL"
		},
		"17019": {
			"short": "Champaign",
			"long": "Champaign County, IL"
		},
		"17021": {
			"short": "Christian",
			"long": "Christian County, IL"
		},
		"17023": {
			"short": "Clark",
			"long": "Clark County, IL"
		},
		"17025": {
			"short": "Clay",
			"long": "Clay County, IL"
		},
		"17027": {
			"short": "Clinton",
			"long": "Clinton County, IL"
		},
		"17029": {
			"short": "Coles",
			"long": "Coles County, IL"
		},
		"17031": {
			"short": "Cook",
			"long": "Cook County, IL"
		},
		"17033": {
			"short": "Crawford",
			"long": "Crawford County, IL"
		},
		"17035": {
			"short": "Cumberland",
			"long": "Cumberland County, IL"
		},
		"17037": {
			"short": "DeKalb",
			"long": "DeKalb County, IL"
		},
		"17039": {
			"short": "De Witt",
			"long": "De Witt County, IL"
		},
		"17041": {
			"short": "Douglas",
			"long": "Douglas County, IL"
		},
		"17043": {
			"short": "DuPage",
			"long": "DuPage County, IL"
		},
		"17045": {
			"short": "Edgar",
			"long": "Edgar County, IL"
		},
		"17047": {
			"short": "Edwards",
			"long": "Edwards County, IL"
		},
		"17049": {
			"short": "Effingham",
			"long": "Effingham County, IL"
		},
		"17051": {
			"short": "Fayette",
			"long": "Fayette County, IL"
		},
		"17053": {
			"short": "Ford",
			"long": "Ford County, IL"
		},
		"17055": {
			"short": "Franklin",
			"long": "Franklin County, IL"
		},
		"17057": {
			"short": "Fulton",
			"long": "Fulton County, IL"
		},
		"17059": {
			"short": "Gallatin",
			"long": "Gallatin County, IL"
		},
		"17061": {
			"short": "Greene",
			"long": "Greene County, IL"
		},
		"17063": {
			"short": "Grundy",
			"long": "Grundy County, IL"
		},
		"17065": {
			"short": "Hamilton",
			"long": "Hamilton County, IL"
		},
		"17067": {
			"short": "Hancock",
			"long": "Hancock County, IL"
		},
		"17069": {
			"short": "Hardin",
			"long": "Hardin County, IL"
		},
		"17071": {
			"short": "Henderson",
			"long": "Henderson County, IL"
		},
		"17073": {
			"short": "Henry",
			"long": "Henry County, IL"
		},
		"17075": {
			"short": "Iroquois",
			"long": "Iroquois County, IL"
		},
		"17077": {
			"short": "Jackson",
			"long": "Jackson County, IL"
		},
		"17079": {
			"short": "Jasper",
			"long": "Jasper County, IL"
		},
		"17081": {
			"short": "Jefferson",
			"long": "Jefferson County, IL"
		},
		"17083": {
			"short": "Jersey",
			"long": "Jersey County, IL"
		},
		"17085": {
			"short": "Jo Daviess",
			"long": "Jo Daviess County, IL"
		},
		"17087": {
			"short": "Johnson",
			"long": "Johnson County, IL"
		},
		"17089": {
			"short": "Kane",
			"long": "Kane County, IL"
		},
		"17091": {
			"short": "Kankakee",
			"long": "Kankakee County, IL"
		},
		"17093": {
			"short": "Kendall",
			"long": "Kendall County, IL"
		},
		"17095": {
			"short": "Knox",
			"long": "Knox County, IL"
		},
		"17097": {
			"short": "Lake",
			"long": "Lake County, IL"
		},
		"17099": {
			"short": "LaSalle",
			"long": "LaSalle County, IL"
		},
		"17101": {
			"short": "Lawrence",
			"long": "Lawrence County, IL"
		},
		"17103": {
			"short": "Lee",
			"long": "Lee County, IL"
		},
		"17105": {
			"short": "Livingston",
			"long": "Livingston County, IL"
		},
		"17107": {
			"short": "Logan",
			"long": "Logan County, IL"
		},
		"17109": {
			"short": "McDonough",
			"long": "McDonough County, IL"
		},
		"17111": {
			"short": "McHenry",
			"long": "McHenry County, IL"
		},
		"17113": {
			"short": "McLean",
			"long": "McLean County, IL"
		},
		"17115": {
			"short": "Macon",
			"long": "Macon County, IL"
		},
		"17117": {
			"short": "Macoupin",
			"long": "Macoupin County, IL"
		},
		"17119": {
			"short": "Madison",
			"long": "Madison County, IL"
		},
		"17121": {
			"short": "Marion",
			"long": "Marion County, IL"
		},
		"17123": {
			"short": "Marshall",
			"long": "Marshall County, IL"
		},
		"17125": {
			"short": "Mason",
			"long": "Mason County, IL"
		},
		"17127": {
			"short": "Massac",
			"long": "Massac County, IL"
		},
		"17129": {
			"short": "Menard",
			"long": "Menard County, IL"
		},
		"17131": {
			"short": "Mercer",
			"long": "Mercer County, IL"
		},
		"17133": {
			"short": "Monroe",
			"long": "Monroe County, IL"
		},
		"17135": {
			"short": "Montgomery",
			"long": "Montgomery County, IL"
		},
		"17137": {
			"short": "Morgan",
			"long": "Morgan County, IL"
		},
		"17139": {
			"short": "Moultrie",
			"long": "Moultrie County, IL"
		},
		"17141": {
			"short": "Ogle",
			"long": "Ogle County, IL"
		},
		"17143": {
			"short": "Peoria",
			"long": "Peoria County, IL"
		},
		"17145": {
			"short": "Perry",
			"long": "Perry County, IL"
		},
		"17147": {
			"short": "Piatt",
			"long": "Piatt County, IL"
		},
		"17149": {
			"short": "Pike",
			"long": "Pike County, IL"
		},
		"17151": {
			"short": "Pope",
			"long": "Pope County, IL"
		},
		"17153": {
			"short": "Pulaski",
			"long": "Pulaski County, IL"
		},
		"17155": {
			"short": "Putnam",
			"long": "Putnam County, IL"
		},
		"17157": {
			"short": "Randolph",
			"long": "Randolph County, IL"
		},
		"17159": {
			"short": "Richland",
			"long": "Richland County, IL"
		},
		"17161": {
			"short": "Rock Island",
			"long": "Rock Island County, IL"
		},
		"17163": {
			"short": "St. Clair",
			"long": "St. Clair County, IL"
		},
		"17165": {
			"short": "Saline",
			"long": "Saline County, IL"
		},
		"17167": {
			"short": "Sangamon",
			"long": "Sangamon County, IL"
		},
		"17169": {
			"short": "Schuyler",
			"long": "Schuyler County, IL"
		},
		"17171": {
			"short": "Scott",
			"long": "Scott County, IL"
		},
		"17173": {
			"short": "Shelby",
			"long": "Shelby County, IL"
		},
		"17175": {
			"short": "Stark",
			"long": "Stark County, IL"
		},
		"17177": {
			"short": "Stephenson",
			"long": "Stephenson County, IL"
		},
		"17179": {
			"short": "Tazewell",
			"long": "Tazewell County, IL"
		},
		"17181": {
			"short": "Union",
			"long": "Union County, IL"
		},
		"17183": {
			"short": "Vermilion",
			"long": "Vermilion County, IL"
		},
		"17185": {
			"short": "Wabash",
			"long": "Wabash County, IL"
		},
		"17187": {
			"short": "Warren",
			"long": "Warren County, IL"
		},
		"17189": {
			"short": "Washington",
			"long": "Washington County, IL"
		},
		"17191": {
			"short": "Wayne",
			"long": "Wayne County, IL"
		},
		"17193": {
			"short": "White",
			"long": "White County, IL"
		},
		"17195": {
			"short": "Whiteside",
			"long": "Whiteside County, IL"
		},
		"17197": {
			"short": "Will",
			"long": "Will County, IL"
		},
		"17199": {
			"short": "Williamson",
			"long": "Williamson County, IL"
		},
		"17201": {
			"short": "Winnebago",
			"long": "Winnebago County, IL"
		},
		"17203": {
			"short": "Woodford",
			"long": "Woodford County, IL"
		},
		"18000": {
			"short": "IN",
			"long": "Indiana"
		},
		"18001": {
			"short": "Adams",
			"long": "Adams County, IN"
		},
		"18003": {
			"short": "Allen",
			"long": "Allen County, IN"
		},
		"18005": {
			"short": "Bartholomew",
			"long": "Bartholomew County, IN"
		},
		"18007": {
			"short": "Benton",
			"long": "Benton County, IN"
		},
		"18009": {
			"short": "Blackford",
			"long": "Blackford County, IN"
		},
		"18011": {
			"short": "Boone",
			"long": "Boone County, IN"
		},
		"18013": {
			"short": "Brown",
			"long": "Brown County, IN"
		},
		"18015": {
			"short": "Carroll",
			"long": "Carroll County, IN"
		},
		"18017": {
			"short": "Cass",
			"long": "Cass County, IN"
		},
		"18019": {
			"short": "Clark",
			"long": "Clark County, IN"
		},
		"18021": {
			"short": "Clay",
			"long": "Clay County, IN"
		},
		"18023": {
			"short": "Clinton",
			"long": "Clinton County, IN"
		},
		"18025": {
			"short": "Crawford",
			"long": "Crawford County, IN"
		},
		"18027": {
			"short": "Daviess",
			"long": "Daviess County, IN"
		},
		"18029": {
			"short": "Dearborn",
			"long": "Dearborn County, IN"
		},
		"18031": {
			"short": "Decatur",
			"long": "Decatur County, IN"
		},
		"18033": {
			"short": "DeKalb",
			"long": "DeKalb County, IN"
		},
		"18035": {
			"short": "Delaware",
			"long": "Delaware County, IN"
		},
		"18037": {
			"short": "Dubois",
			"long": "Dubois County, IN"
		},
		"18039": {
			"short": "Elkhart",
			"long": "Elkhart County, IN"
		},
		"18041": {
			"short": "Fayette",
			"long": "Fayette County, IN"
		},
		"18043": {
			"short": "Floyd",
			"long": "Floyd County, IN"
		},
		"18045": {
			"short": "Fountain",
			"long": "Fountain County, IN"
		},
		"18047": {
			"short": "Franklin",
			"long": "Franklin County, IN"
		},
		"18049": {
			"short": "Fulton",
			"long": "Fulton County, IN"
		},
		"18051": {
			"short": "Gibson",
			"long": "Gibson County, IN"
		},
		"18053": {
			"short": "Grant",
			"long": "Grant County, IN"
		},
		"18055": {
			"short": "Greene",
			"long": "Greene County, IN"
		},
		"18057": {
			"short": "Hamilton",
			"long": "Hamilton County, IN"
		},
		"18059": {
			"short": "Hancock",
			"long": "Hancock County, IN"
		},
		"18061": {
			"short": "Harrison",
			"long": "Harrison County, IN"
		},
		"18063": {
			"short": "Hendricks",
			"long": "Hendricks County, IN"
		},
		"18065": {
			"short": "Henry",
			"long": "Henry County, IN"
		},
		"18067": {
			"short": "Howard",
			"long": "Howard County, IN"
		},
		"18069": {
			"short": "Huntington",
			"long": "Huntington County, IN"
		},
		"18071": {
			"short": "Jackson",
			"long": "Jackson County, IN"
		},
		"18073": {
			"short": "Jasper",
			"long": "Jasper County, IN"
		},
		"18075": {
			"short": "Jay",
			"long": "Jay County, IN"
		},
		"18077": {
			"short": "Jefferson",
			"long": "Jefferson County, IN"
		},
		"18079": {
			"short": "Jennings",
			"long": "Jennings County, IN"
		},
		"18081": {
			"short": "Johnson",
			"long": "Johnson County, IN"
		},
		"18083": {
			"short": "Knox",
			"long": "Knox County, IN"
		},
		"18085": {
			"short": "Kosciusko",
			"long": "Kosciusko County, IN"
		},
		"18087": {
			"short": "LaGrange",
			"long": "LaGrange County, IN"
		},
		"18089": {
			"short": "Lake",
			"long": "Lake County, IN"
		},
		"18091": {
			"short": "LaPorte",
			"long": "LaPorte County, IN"
		},
		"18093": {
			"short": "Lawrence",
			"long": "Lawrence County, IN"
		},
		"18095": {
			"short": "Madison",
			"long": "Madison County, IN"
		},
		"18097": {
			"short": "Marion",
			"long": "Marion County, IN"
		},
		"18099": {
			"short": "Marshall",
			"long": "Marshall County, IN"
		},
		"18101": {
			"short": "Martin",
			"long": "Martin County, IN"
		},
		"18103": {
			"short": "Miami",
			"long": "Miami County, IN"
		},
		"18105": {
			"short": "Monroe",
			"long": "Monroe County, IN"
		},
		"18107": {
			"short": "Montgomery",
			"long": "Montgomery County, IN"
		},
		"18109": {
			"short": "Morgan",
			"long": "Morgan County, IN"
		},
		"18111": {
			"short": "Newton",
			"long": "Newton County, IN"
		},
		"18113": {
			"short": "Noble",
			"long": "Noble County, IN"
		},
		"18115": {
			"short": "Ohio",
			"long": "Ohio County, IN"
		},
		"18117": {
			"short": "Orange",
			"long": "Orange County, IN"
		},
		"18119": {
			"short": "Owen",
			"long": "Owen County, IN"
		},
		"18121": {
			"short": "Parke",
			"long": "Parke County, IN"
		},
		"18123": {
			"short": "Perry",
			"long": "Perry County, IN"
		},
		"18125": {
			"short": "Pike",
			"long": "Pike County, IN"
		},
		"18127": {
			"short": "Porter",
			"long": "Porter County, IN"
		},
		"18129": {
			"short": "Posey",
			"long": "Posey County, IN"
		},
		"18131": {
			"short": "Pulaski",
			"long": "Pulaski County, IN"
		},
		"18133": {
			"short": "Putnam",
			"long": "Putnam County, IN"
		},
		"18135": {
			"short": "Randolph",
			"long": "Randolph County, IN"
		},
		"18137": {
			"short": "Ripley",
			"long": "Ripley County, IN"
		},
		"18139": {
			"short": "Rush",
			"long": "Rush County, IN"
		},
		"18141": {
			"short": "St. Joseph",
			"long": "St. Joseph County, IN"
		},
		"18143": {
			"short": "Scott",
			"long": "Scott County, IN"
		},
		"18145": {
			"short": "Shelby",
			"long": "Shelby County, IN"
		},
		"18147": {
			"short": "Spencer",
			"long": "Spencer County, IN"
		},
		"18149": {
			"short": "Starke",
			"long": "Starke County, IN"
		},
		"18151": {
			"short": "Steuben",
			"long": "Steuben County, IN"
		},
		"18153": {
			"short": "Sullivan",
			"long": "Sullivan County, IN"
		},
		"18155": {
			"short": "Switzerland",
			"long": "Switzerland County, IN"
		},
		"18157": {
			"short": "Tippecanoe",
			"long": "Tippecanoe County, IN"
		},
		"18159": {
			"short": "Tipton",
			"long": "Tipton County, IN"
		},
		"18161": {
			"short": "Union",
			"long": "Union County, IN"
		},
		"18163": {
			"short": "Vanderburgh",
			"long": "Vanderburgh County, IN"
		},
		"18165": {
			"short": "Vermillion",
			"long": "Vermillion County, IN"
		},
		"18167": {
			"short": "Vigo",
			"long": "Vigo County, IN"
		},
		"18169": {
			"short": "Wabash",
			"long": "Wabash County, IN"
		},
		"18171": {
			"short": "Warren",
			"long": "Warren County, IN"
		},
		"18173": {
			"short": "Warrick",
			"long": "Warrick County, IN"
		},
		"18175": {
			"short": "Washington",
			"long": "Washington County, IN"
		},
		"18177": {
			"short": "Wayne",
			"long": "Wayne County, IN"
		},
		"18179": {
			"short": "Wells",
			"long": "Wells County, IN"
		},
		"18181": {
			"short": "White",
			"long": "White County, IN"
		},
		"18183": {
			"short": "Whitley",
			"long": "Whitley County, IN"
		},
		"19000": {
			"short": "IA",
			"long": "Iowa"
		},
		"19001": {
			"short": "Adair",
			"long": "Adair County, IA"
		},
		"19003": {
			"short": "Adams",
			"long": "Adams County, IA"
		},
		"19005": {
			"short": "Allamakee",
			"long": "Allamakee County, IA"
		},
		"19007": {
			"short": "Appanoose",
			"long": "Appanoose County, IA"
		},
		"19009": {
			"short": "Audubon",
			"long": "Audubon County, IA"
		},
		"19011": {
			"short": "Benton",
			"long": "Benton County, IA"
		},
		"19013": {
			"short": "Black Hawk",
			"long": "Black Hawk County, IA"
		},
		"19015": {
			"short": "Boone",
			"long": "Boone County, IA"
		},
		"19017": {
			"short": "Bremer",
			"long": "Bremer County, IA"
		},
		"19019": {
			"short": "Buchanan",
			"long": "Buchanan County, IA"
		},
		"19021": {
			"short": "Buena Vista",
			"long": "Buena Vista County, IA"
		},
		"19023": {
			"short": "Butler",
			"long": "Butler County, IA"
		},
		"19025": {
			"short": "Calhoun",
			"long": "Calhoun County, IA"
		},
		"19027": {
			"short": "Carroll",
			"long": "Carroll County, IA"
		},
		"19029": {
			"short": "Cass",
			"long": "Cass County, IA"
		},
		"19031": {
			"short": "Cedar",
			"long": "Cedar County, IA"
		},
		"19033": {
			"short": "Cerro Gordo",
			"long": "Cerro Gordo County, IA"
		},
		"19035": {
			"short": "Cherokee",
			"long": "Cherokee County, IA"
		},
		"19037": {
			"short": "Chickasaw",
			"long": "Chickasaw County, IA"
		},
		"19039": {
			"short": "Clarke",
			"long": "Clarke County, IA"
		},
		"19041": {
			"short": "Clay",
			"long": "Clay County, IA"
		},
		"19043": {
			"short": "Clayton",
			"long": "Clayton County, IA"
		},
		"19045": {
			"short": "Clinton",
			"long": "Clinton County, IA"
		},
		"19047": {
			"short": "Crawford",
			"long": "Crawford County, IA"
		},
		"19049": {
			"short": "Dallas",
			"long": "Dallas County, IA"
		},
		"19051": {
			"short": "Davis",
			"long": "Davis County, IA"
		},
		"19053": {
			"short": "Decatur",
			"long": "Decatur County, IA"
		},
		"19055": {
			"short": "Delaware",
			"long": "Delaware County, IA"
		},
		"19057": {
			"short": "Des Moines",
			"long": "Des Moines County, IA"
		},
		"19059": {
			"short": "Dickinson",
			"long": "Dickinson County, IA"
		},
		"19061": {
			"short": "Dubuque",
			"long": "Dubuque County, IA"
		},
		"19063": {
			"short": "Emmet",
			"long": "Emmet County, IA"
		},
		"19065": {
			"short": "Fayette",
			"long": "Fayette County, IA"
		},
		"19067": {
			"short": "Floyd",
			"long": "Floyd County, IA"
		},
		"19069": {
			"short": "Franklin",
			"long": "Franklin County, IA"
		},
		"19071": {
			"short": "Fremont",
			"long": "Fremont County, IA"
		},
		"19073": {
			"short": "Greene",
			"long": "Greene County, IA"
		},
		"19075": {
			"short": "Grundy",
			"long": "Grundy County, IA"
		},
		"19077": {
			"short": "Guthrie",
			"long": "Guthrie County, IA"
		},
		"19079": {
			"short": "Hamilton",
			"long": "Hamilton County, IA"
		},
		"19081": {
			"short": "Hancock",
			"long": "Hancock County, IA"
		},
		"19083": {
			"short": "Hardin",
			"long": "Hardin County, IA"
		},
		"19085": {
			"short": "Harrison",
			"long": "Harrison County, IA"
		},
		"19087": {
			"short": "Henry",
			"long": "Henry County, IA"
		},
		"19089": {
			"short": "Howard",
			"long": "Howard County, IA"
		},
		"19091": {
			"short": "Humboldt",
			"long": "Humboldt County, IA"
		},
		"19093": {
			"short": "Ida",
			"long": "Ida County, IA"
		},
		"19095": {
			"short": "Iowa",
			"long": "Iowa County, IA"
		},
		"19097": {
			"short": "Jackson",
			"long": "Jackson County, IA"
		},
		"19099": {
			"short": "Jasper",
			"long": "Jasper County, IA"
		},
		"19101": {
			"short": "Jefferson",
			"long": "Jefferson County, IA"
		},
		"19103": {
			"short": "Johnson",
			"long": "Johnson County, IA"
		},
		"19105": {
			"short": "Jones",
			"long": "Jones County, IA"
		},
		"19107": {
			"short": "Keokuk",
			"long": "Keokuk County, IA"
		},
		"19109": {
			"short": "Kossuth",
			"long": "Kossuth County, IA"
		},
		"19111": {
			"short": "Lee",
			"long": "Lee County, IA"
		},
		"19113": {
			"short": "Linn",
			"long": "Linn County, IA"
		},
		"19115": {
			"short": "Louisa",
			"long": "Louisa County, IA"
		},
		"19117": {
			"short": "Lucas",
			"long": "Lucas County, IA"
		},
		"19119": {
			"short": "Lyon",
			"long": "Lyon County, IA"
		},
		"19121": {
			"short": "Madison",
			"long": "Madison County, IA"
		},
		"19123": {
			"short": "Mahaska",
			"long": "Mahaska County, IA"
		},
		"19125": {
			"short": "Marion",
			"long": "Marion County, IA"
		},
		"19127": {
			"short": "Marshall",
			"long": "Marshall County, IA"
		},
		"19129": {
			"short": "Mills",
			"long": "Mills County, IA"
		},
		"19131": {
			"short": "Mitchell",
			"long": "Mitchell County, IA"
		},
		"19133": {
			"short": "Monona",
			"long": "Monona County, IA"
		},
		"19135": {
			"short": "Monroe",
			"long": "Monroe County, IA"
		},
		"19137": {
			"short": "Montgomery",
			"long": "Montgomery County, IA"
		},
		"19139": {
			"short": "Muscatine",
			"long": "Muscatine County, IA"
		},
		"19141": {
			"short": "O'Brien",
			"long": "O'Brien County, IA"
		},
		"19143": {
			"short": "Osceola",
			"long": "Osceola County, IA"
		},
		"19145": {
			"short": "Page",
			"long": "Page County, IA"
		},
		"19147": {
			"short": "Palo Alto",
			"long": "Palo Alto County, IA"
		},
		"19149": {
			"short": "Plymouth",
			"long": "Plymouth County, IA"
		},
		"19151": {
			"short": "Pocahontas",
			"long": "Pocahontas County, IA"
		},
		"19153": {
			"short": "Polk",
			"long": "Polk County, IA"
		},
		"19155": {
			"short": "Pottawattamie",
			"long": "Pottawattamie County, IA"
		},
		"19157": {
			"short": "Poweshiek",
			"long": "Poweshiek County, IA"
		},
		"19159": {
			"short": "Ringgold",
			"long": "Ringgold County, IA"
		},
		"19161": {
			"short": "Sac",
			"long": "Sac County, IA"
		},
		"19163": {
			"short": "Scott",
			"long": "Scott County, IA"
		},
		"19165": {
			"short": "Shelby",
			"long": "Shelby County, IA"
		},
		"19167": {
			"short": "Sioux",
			"long": "Sioux County, IA"
		},
		"19169": {
			"short": "Story",
			"long": "Story County, IA"
		},
		"19171": {
			"short": "Tama",
			"long": "Tama County, IA"
		},
		"19173": {
			"short": "Taylor",
			"long": "Taylor County, IA"
		},
		"19175": {
			"short": "Union",
			"long": "Union County, IA"
		},
		"19177": {
			"short": "Van Buren",
			"long": "Van Buren County, IA"
		},
		"19179": {
			"short": "Wapello",
			"long": "Wapello County, IA"
		},
		"19181": {
			"short": "Warren",
			"long": "Warren County, IA"
		},
		"19183": {
			"short": "Washington",
			"long": "Washington County, IA"
		},
		"19185": {
			"short": "Wayne",
			"long": "Wayne County, IA"
		},
		"19187": {
			"short": "Webster",
			"long": "Webster County, IA"
		},
		"19189": {
			"short": "Winnebago",
			"long": "Winnebago County, IA"
		},
		"19191": {
			"short": "Winneshiek",
			"long": "Winneshiek County, IA"
		},
		"19193": {
			"short": "Woodbury",
			"long": "Woodbury County, IA"
		},
		"19195": {
			"short": "Worth",
			"long": "Worth County, IA"
		},
		"19197": {
			"short": "Wright",
			"long": "Wright County, IA"
		},
		"20000": {
			"short": "KS",
			"long": "Kansas"
		},
		"20001": {
			"short": "Allen",
			"long": "Allen County, KS"
		},
		"20003": {
			"short": "Anderson",
			"long": "Anderson County, KS"
		},
		"20005": {
			"short": "Atchison",
			"long": "Atchison County, KS"
		},
		"20007": {
			"short": "Barber",
			"long": "Barber County, KS"
		},
		"20009": {
			"short": "Barton",
			"long": "Barton County, KS"
		},
		"20011": {
			"short": "Bourbon",
			"long": "Bourbon County, KS"
		},
		"20013": {
			"short": "Brown",
			"long": "Brown County, KS"
		},
		"20015": {
			"short": "Butler",
			"long": "Butler County, KS"
		},
		"20017": {
			"short": "Chase",
			"long": "Chase County, KS"
		},
		"20019": {
			"short": "Chautauqua",
			"long": "Chautauqua County, KS"
		},
		"20021": {
			"short": "Cherokee",
			"long": "Cherokee County, KS"
		},
		"20023": {
			"short": "Cheyenne",
			"long": "Cheyenne County, KS"
		},
		"20025": {
			"short": "Clark",
			"long": "Clark County, KS"
		},
		"20027": {
			"short": "Clay",
			"long": "Clay County, KS"
		},
		"20029": {
			"short": "Cloud",
			"long": "Cloud County, KS"
		},
		"20031": {
			"short": "Coffey",
			"long": "Coffey County, KS"
		},
		"20033": {
			"short": "Comanche",
			"long": "Comanche County, KS"
		},
		"20035": {
			"short": "Cowley",
			"long": "Cowley County, KS"
		},
		"20037": {
			"short": "Crawford",
			"long": "Crawford County, KS"
		},
		"20039": {
			"short": "Decatur",
			"long": "Decatur County, KS"
		},
		"20041": {
			"short": "Dickinson",
			"long": "Dickinson County, KS"
		},
		"20043": {
			"short": "Doniphan",
			"long": "Doniphan County, KS"
		},
		"20045": {
			"short": "Douglas",
			"long": "Douglas County, KS"
		},
		"20047": {
			"short": "Edwards",
			"long": "Edwards County, KS"
		},
		"20049": {
			"short": "Elk",
			"long": "Elk County, KS"
		},
		"20051": {
			"short": "Ellis",
			"long": "Ellis County, KS"
		},
		"20053": {
			"short": "Ellsworth",
			"long": "Ellsworth County, KS"
		},
		"20055": {
			"short": "Finney",
			"long": "Finney County, KS"
		},
		"20057": {
			"short": "Ford",
			"long": "Ford County, KS"
		},
		"20059": {
			"short": "Franklin",
			"long": "Franklin County, KS"
		},
		"20061": {
			"short": "Geary",
			"long": "Geary County, KS"
		},
		"20063": {
			"short": "Gove",
			"long": "Gove County, KS"
		},
		"20065": {
			"short": "Graham",
			"long": "Graham County, KS"
		},
		"20067": {
			"short": "Grant",
			"long": "Grant County, KS"
		},
		"20069": {
			"short": "Gray",
			"long": "Gray County, KS"
		},
		"20071": {
			"short": "Greeley",
			"long": "Greeley County, KS"
		},
		"20073": {
			"short": "Greenwood",
			"long": "Greenwood County, KS"
		},
		"20075": {
			"short": "Hamilton",
			"long": "Hamilton County, KS"
		},
		"20077": {
			"short": "Harper",
			"long": "Harper County, KS"
		},
		"20079": {
			"short": "Harvey",
			"long": "Harvey County, KS"
		},
		"20081": {
			"short": "Haskell",
			"long": "Haskell County, KS"
		},
		"20083": {
			"short": "Hodgeman",
			"long": "Hodgeman County, KS"
		},
		"20085": {
			"short": "Jackson",
			"long": "Jackson County, KS"
		},
		"20087": {
			"short": "Jefferson",
			"long": "Jefferson County, KS"
		},
		"20089": {
			"short": "Jewell",
			"long": "Jewell County, KS"
		},
		"20091": {
			"short": "Johnson",
			"long": "Johnson County, KS"
		},
		"20093": {
			"short": "Kearny",
			"long": "Kearny County, KS"
		},
		"20095": {
			"short": "Kingman",
			"long": "Kingman County, KS"
		},
		"20097": {
			"short": "Kiowa",
			"long": "Kiowa County, KS"
		},
		"20099": {
			"short": "Labette",
			"long": "Labette County, KS"
		},
		"20101": {
			"short": "Lane",
			"long": "Lane County, KS"
		},
		"20103": {
			"short": "Leavenworth",
			"long": "Leavenworth County, KS"
		},
		"20105": {
			"short": "Lincoln",
			"long": "Lincoln County, KS"
		},
		"20107": {
			"short": "Linn",
			"long": "Linn County, KS"
		},
		"20109": {
			"short": "Logan",
			"long": "Logan County, KS"
		},
		"20111": {
			"short": "Lyon",
			"long": "Lyon County, KS"
		},
		"20113": {
			"short": "McPherson",
			"long": "McPherson County, KS"
		},
		"20115": {
			"short": "Marion",
			"long": "Marion County, KS"
		},
		"20117": {
			"short": "Marshall",
			"long": "Marshall County, KS"
		},
		"20119": {
			"short": "Meade",
			"long": "Meade County, KS"
		},
		"20121": {
			"short": "Miami",
			"long": "Miami County, KS"
		},
		"20123": {
			"short": "Mitchell",
			"long": "Mitchell County, KS"
		},
		"20125": {
			"short": "Montgomery",
			"long": "Montgomery County, KS"
		},
		"20127": {
			"short": "Morris",
			"long": "Morris County, KS"
		},
		"20129": {
			"short": "Morton",
			"long": "Morton County, KS"
		},
		"20131": {
			"short": "Nemaha",
			"long": "Nemaha County, KS"
		},
		"20133": {
			"short": "Neosho",
			"long": "Neosho County, KS"
		},
		"20135": {
			"short": "Ness",
			"long": "Ness County, KS"
		},
		"20137": {
			"short": "Norton",
			"long": "Norton County, KS"
		},
		"20139": {
			"short": "Osage",
			"long": "Osage County, KS"
		},
		"20141": {
			"short": "Osborne",
			"long": "Osborne County, KS"
		},
		"20143": {
			"short": "Ottawa",
			"long": "Ottawa County, KS"
		},
		"20145": {
			"short": "Pawnee",
			"long": "Pawnee County, KS"
		},
		"20147": {
			"short": "Phillips",
			"long": "Phillips County, KS"
		},
		"20149": {
			"short": "Pottawatomie",
			"long": "Pottawatomie County, KS"
		},
		"20151": {
			"short": "Pratt",
			"long": "Pratt County, KS"
		},
		"20153": {
			"short": "Rawlins",
			"long": "Rawlins County, KS"
		},
		"20155": {
			"short": "Reno",
			"long": "Reno County, KS"
		},
		"20157": {
			"short": "Republic",
			"long": "Republic County, KS"
		},
		"20159": {
			"short": "Rice",
			"long": "Rice County, KS"
		},
		"20161": {
			"short": "Riley",
			"long": "Riley County, KS"
		},
		"20163": {
			"short": "Rooks",
			"long": "Rooks County, KS"
		},
		"20165": {
			"short": "Rush",
			"long": "Rush County, KS"
		},
		"20167": {
			"short": "Russell",
			"long": "Russell County, KS"
		},
		"20169": {
			"short": "Saline",
			"long": "Saline County, KS"
		},
		"20171": {
			"short": "Scott",
			"long": "Scott County, KS"
		},
		"20173": {
			"short": "Sedgwick",
			"long": "Sedgwick County, KS"
		},
		"20175": {
			"short": "Seward",
			"long": "Seward County, KS"
		},
		"20177": {
			"short": "Shawnee",
			"long": "Shawnee County, KS"
		},
		"20179": {
			"short": "Sheridan",
			"long": "Sheridan County, KS"
		},
		"20181": {
			"short": "Sherman",
			"long": "Sherman County, KS"
		},
		"20183": {
			"short": "Smith",
			"long": "Smith County, KS"
		},
		"20185": {
			"short": "Stafford",
			"long": "Stafford County, KS"
		},
		"20187": {
			"short": "Stanton",
			"long": "Stanton County, KS"
		},
		"20189": {
			"short": "Stevens",
			"long": "Stevens County, KS"
		},
		"20191": {
			"short": "Sumner",
			"long": "Sumner County, KS"
		},
		"20193": {
			"short": "Thomas",
			"long": "Thomas County, KS"
		},
		"20195": {
			"short": "Trego",
			"long": "Trego County, KS"
		},
		"20197": {
			"short": "Wabaunsee",
			"long": "Wabaunsee County, KS"
		},
		"20199": {
			"short": "Wallace",
			"long": "Wallace County, KS"
		},
		"20201": {
			"short": "Washington",
			"long": "Washington County, KS"
		},
		"20203": {
			"short": "Wichita",
			"long": "Wichita County, KS"
		},
		"20205": {
			"short": "Wilson",
			"long": "Wilson County, KS"
		},
		"20207": {
			"short": "Woodson",
			"long": "Woodson County, KS"
		},
		"20209": {
			"short": "Wyandotte",
			"long": "Wyandotte County, KS"
		},
		"21000": {
			"short": "KY",
			"long": "Kentucky"
		},
		"21001": {
			"short": "Adair",
			"long": "Adair County, KY"
		},
		"21003": {
			"short": "Allen",
			"long": "Allen County, KY"
		},
		"21005": {
			"short": "Anderson",
			"long": "Anderson County, KY"
		},
		"21007": {
			"short": "Ballard",
			"long": "Ballard County, KY"
		},
		"21009": {
			"short": "Barren",
			"long": "Barren County, KY"
		},
		"21011": {
			"short": "Bath",
			"long": "Bath County, KY"
		},
		"21013": {
			"short": "Bell",
			"long": "Bell County, KY"
		},
		"21015": {
			"short": "Boone",
			"long": "Boone County, KY"
		},
		"21017": {
			"short": "Bourbon",
			"long": "Bourbon County, KY"
		},
		"21019": {
			"short": "Boyd",
			"long": "Boyd County, KY"
		},
		"21021": {
			"short": "Boyle",
			"long": "Boyle County, KY"
		},
		"21023": {
			"short": "Bracken",
			"long": "Bracken County, KY"
		},
		"21025": {
			"short": "Breathitt",
			"long": "Breathitt County, KY"
		},
		"21027": {
			"short": "Breckinridge",
			"long": "Breckinridge County, KY"
		},
		"21029": {
			"short": "Bullitt",
			"long": "Bullitt County, KY"
		},
		"21031": {
			"short": "Butler",
			"long": "Butler County, KY"
		},
		"21033": {
			"short": "Caldwell",
			"long": "Caldwell County, KY"
		},
		"21035": {
			"short": "Calloway",
			"long": "Calloway County, KY"
		},
		"21037": {
			"short": "Campbell",
			"long": "Campbell County, KY"
		},
		"21039": {
			"short": "Carlisle",
			"long": "Carlisle County, KY"
		},
		"21041": {
			"short": "Carroll",
			"long": "Carroll County, KY"
		},
		"21043": {
			"short": "Carter",
			"long": "Carter County, KY"
		},
		"21045": {
			"short": "Casey",
			"long": "Casey County, KY"
		},
		"21047": {
			"short": "Christian",
			"long": "Christian County, KY"
		},
		"21049": {
			"short": "Clark",
			"long": "Clark County, KY"
		},
		"21051": {
			"short": "Clay",
			"long": "Clay County, KY"
		},
		"21053": {
			"short": "Clinton",
			"long": "Clinton County, KY"
		},
		"21055": {
			"short": "Crittenden",
			"long": "Crittenden County, KY"
		},
		"21057": {
			"short": "Cumberland",
			"long": "Cumberland County, KY"
		},
		"21059": {
			"short": "Daviess",
			"long": "Daviess County, KY"
		},
		"21061": {
			"short": "Edmonson",
			"long": "Edmonson County, KY"
		},
		"21063": {
			"short": "Elliott",
			"long": "Elliott County, KY"
		},
		"21065": {
			"short": "Estill",
			"long": "Estill County, KY"
		},
		"21067": {
			"short": "Fayette",
			"long": "Fayette County, KY"
		},
		"21069": {
			"short": "Fleming",
			"long": "Fleming County, KY"
		},
		"21071": {
			"short": "Floyd",
			"long": "Floyd County, KY"
		},
		"21073": {
			"short": "Franklin",
			"long": "Franklin County, KY"
		},
		"21075": {
			"short": "Fulton",
			"long": "Fulton County, KY"
		},
		"21077": {
			"short": "Gallatin",
			"long": "Gallatin County, KY"
		},
		"21079": {
			"short": "Garrard",
			"long": "Garrard County, KY"
		},
		"21081": {
			"short": "Grant",
			"long": "Grant County, KY"
		},
		"21083": {
			"short": "Graves",
			"long": "Graves County, KY"
		},
		"21085": {
			"short": "Grayson",
			"long": "Grayson County, KY"
		},
		"21087": {
			"short": "Green",
			"long": "Green County, KY"
		},
		"21089": {
			"short": "Greenup",
			"long": "Greenup County, KY"
		},
		"21091": {
			"short": "Hancock",
			"long": "Hancock County, KY"
		},
		"21093": {
			"short": "Hardin",
			"long": "Hardin County, KY"
		},
		"21095": {
			"short": "Harlan",
			"long": "Harlan County, KY"
		},
		"21097": {
			"short": "Harrison",
			"long": "Harrison County, KY"
		},
		"21099": {
			"short": "Hart",
			"long": "Hart County, KY"
		},
		"21101": {
			"short": "Henderson",
			"long": "Henderson County, KY"
		},
		"21103": {
			"short": "Henry",
			"long": "Henry County, KY"
		},
		"21105": {
			"short": "Hickman",
			"long": "Hickman County, KY"
		},
		"21107": {
			"short": "Hopkins",
			"long": "Hopkins County, KY"
		},
		"21109": {
			"short": "Jackson",
			"long": "Jackson County, KY"
		},
		"21111": {
			"short": "Jefferson",
			"long": "Jefferson County, KY"
		},
		"21113": {
			"short": "Jessamine",
			"long": "Jessamine County, KY"
		},
		"21115": {
			"short": "Johnson",
			"long": "Johnson County, KY"
		},
		"21117": {
			"short": "Kenton",
			"long": "Kenton County, KY"
		},
		"21119": {
			"short": "Knott",
			"long": "Knott County, KY"
		},
		"21121": {
			"short": "Knox",
			"long": "Knox County, KY"
		},
		"21123": {
			"short": "Larue",
			"long": "Larue County, KY"
		},
		"21125": {
			"short": "Laurel",
			"long": "Laurel County, KY"
		},
		"21127": {
			"short": "Lawrence",
			"long": "Lawrence County, KY"
		},
		"21129": {
			"short": "Lee",
			"long": "Lee County, KY"
		},
		"21131": {
			"short": "Leslie",
			"long": "Leslie County, KY"
		},
		"21133": {
			"short": "Letcher",
			"long": "Letcher County, KY"
		},
		"21135": {
			"short": "Lewis",
			"long": "Lewis County, KY"
		},
		"21137": {
			"short": "Lincoln",
			"long": "Lincoln County, KY"
		},
		"21139": {
			"short": "Livingston",
			"long": "Livingston County, KY"
		},
		"21141": {
			"short": "Logan",
			"long": "Logan County, KY"
		},
		"21143": {
			"short": "Lyon",
			"long": "Lyon County, KY"
		},
		"21145": {
			"short": "McCracken",
			"long": "McCracken County, KY"
		},
		"21147": {
			"short": "McCreary",
			"long": "McCreary County, KY"
		},
		"21149": {
			"short": "McLean",
			"long": "McLean County, KY"
		},
		"21151": {
			"short": "Madison",
			"long": "Madison County, KY"
		},
		"21153": {
			"short": "Magoffin",
			"long": "Magoffin County, KY"
		},
		"21155": {
			"short": "Marion",
			"long": "Marion County, KY"
		},
		"21157": {
			"short": "Marshall",
			"long": "Marshall County, KY"
		},
		"21159": {
			"short": "Martin",
			"long": "Martin County, KY"
		},
		"21161": {
			"short": "Mason",
			"long": "Mason County, KY"
		},
		"21163": {
			"short": "Meade",
			"long": "Meade County, KY"
		},
		"21165": {
			"short": "Menifee",
			"long": "Menifee County, KY"
		},
		"21167": {
			"short": "Mercer",
			"long": "Mercer County, KY"
		},
		"21169": {
			"short": "Metcalfe",
			"long": "Metcalfe County, KY"
		},
		"21171": {
			"short": "Monroe",
			"long": "Monroe County, KY"
		},
		"21173": {
			"short": "Montgomery",
			"long": "Montgomery County, KY"
		},
		"21175": {
			"short": "Morgan",
			"long": "Morgan County, KY"
		},
		"21177": {
			"short": "Muhlenberg",
			"long": "Muhlenberg County, KY"
		},
		"21179": {
			"short": "Nelson",
			"long": "Nelson County, KY"
		},
		"21181": {
			"short": "Nicholas",
			"long": "Nicholas County, KY"
		},
		"21183": {
			"short": "Ohio",
			"long": "Ohio County, KY"
		},
		"21185": {
			"short": "Oldham",
			"long": "Oldham County, KY"
		},
		"21187": {
			"short": "Owen",
			"long": "Owen County, KY"
		},
		"21189": {
			"short": "Owsley",
			"long": "Owsley County, KY"
		},
		"21191": {
			"short": "Pendleton",
			"long": "Pendleton County, KY"
		},
		"21193": {
			"short": "Perry",
			"long": "Perry County, KY"
		},
		"21195": {
			"short": "Pike",
			"long": "Pike County, KY"
		},
		"21197": {
			"short": "Powell",
			"long": "Powell County, KY"
		},
		"21199": {
			"short": "Pulaski",
			"long": "Pulaski County, KY"
		},
		"21201": {
			"short": "Robertson",
			"long": "Robertson County, KY"
		},
		"21203": {
			"short": "Rockcastle",
			"long": "Rockcastle County, KY"
		},
		"21205": {
			"short": "Rowan",
			"long": "Rowan County, KY"
		},
		"21207": {
			"short": "Russell",
			"long": "Russell County, KY"
		},
		"21209": {
			"short": "Scott",
			"long": "Scott County, KY"
		},
		"21211": {
			"short": "Shelby",
			"long": "Shelby County, KY"
		},
		"21213": {
			"short": "Simpson",
			"long": "Simpson County, KY"
		},
		"21215": {
			"short": "Spencer",
			"long": "Spencer County, KY"
		},
		"21217": {
			"short": "Taylor",
			"long": "Taylor County, KY"
		},
		"21219": {
			"short": "Todd",
			"long": "Todd County, KY"
		},
		"21221": {
			"short": "Trigg",
			"long": "Trigg County, KY"
		},
		"21223": {
			"short": "Trimble",
			"long": "Trimble County, KY"
		},
		"21225": {
			"short": "Union",
			"long": "Union County, KY"
		},
		"21227": {
			"short": "Warren",
			"long": "Warren County, KY"
		},
		"21229": {
			"short": "Washington",
			"long": "Washington County, KY"
		},
		"21231": {
			"short": "Wayne",
			"long": "Wayne County, KY"
		},
		"21233": {
			"short": "Webster",
			"long": "Webster County, KY"
		},
		"21235": {
			"short": "Whitley",
			"long": "Whitley County, KY"
		},
		"21237": {
			"short": "Wolfe",
			"long": "Wolfe County, KY"
		},
		"21239": {
			"short": "Woodford",
			"long": "Woodford County, KY"
		},
		"22000": {
			"short": "LA",
			"long": "Louisiana"
		},
		"22001": {
			"short": "Acadia Parish",
			"long": "Acadia Parish, LA"
		},
		"22003": {
			"short": "Allen Parish",
			"long": "Allen Parish, LA"
		},
		"22005": {
			"short": "Ascension Parish",
			"long": "Ascension Parish, LA"
		},
		"22007": {
			"short": "Assumption Parish",
			"long": "Assumption Parish, LA"
		},
		"22009": {
			"short": "Avoyelles Parish",
			"long": "Avoyelles Parish, LA"
		},
		"22011": {
			"short": "Beauregard Parish",
			"long": "Beauregard Parish, LA"
		},
		"22013": {
			"short": "Bienville Parish",
			"long": "Bienville Parish, LA"
		},
		"22015": {
			"short": "Bossier Parish",
			"long": "Bossier Parish, LA"
		},
		"22017": {
			"short": "Caddo Parish",
			"long": "Caddo Parish, LA"
		},
		"22019": {
			"short": "Calcasieu Parish",
			"long": "Calcasieu Parish, LA"
		},
		"22021": {
			"short": "Caldwell Parish",
			"long": "Caldwell Parish, LA"
		},
		"22023": {
			"short": "Cameron Parish",
			"long": "Cameron Parish, LA"
		},
		"22025": {
			"short": "Catahoula Parish",
			"long": "Catahoula Parish, LA"
		},
		"22027": {
			"short": "Claiborne Parish",
			"long": "Claiborne Parish, LA"
		},
		"22029": {
			"short": "Concordia Parish",
			"long": "Concordia Parish, LA"
		},
		"22031": {
			"short": "De Soto Parish",
			"long": "De Soto Parish, LA"
		},
		"22033": {
			"short": "East Baton Rouge Parish",
			"long": "East Baton Rouge Parish, LA"
		},
		"22035": {
			"short": "East Carroll Parish",
			"long": "East Carroll Parish, LA"
		},
		"22037": {
			"short": "East Feliciana Parish",
			"long": "East Feliciana Parish, LA"
		},
		"22039": {
			"short": "Evangeline Parish",
			"long": "Evangeline Parish, LA"
		},
		"22041": {
			"short": "Franklin Parish",
			"long": "Franklin Parish, LA"
		},
		"22043": {
			"short": "Grant Parish",
			"long": "Grant Parish, LA"
		},
		"22045": {
			"short": "Iberia Parish",
			"long": "Iberia Parish, LA"
		},
		"22047": {
			"short": "Iberville Parish",
			"long": "Iberville Parish, LA"
		},
		"22049": {
			"short": "Jackson Parish",
			"long": "Jackson Parish, LA"
		},
		"22051": {
			"short": "Jefferson Parish",
			"long": "Jefferson Parish, LA"
		},
		"22053": {
			"short": "Jefferson Davis Parish",
			"long": "Jefferson Davis Parish, LA"
		},
		"22055": {
			"short": "Lafayette Parish",
			"long": "Lafayette Parish, LA"
		},
		"22057": {
			"short": "Lafourche Parish",
			"long": "Lafourche Parish, LA"
		},
		"22059": {
			"short": "La Salle Parish",
			"long": "La Salle Parish, LA"
		},
		"22061": {
			"short": "Lincoln Parish",
			"long": "Lincoln Parish, LA"
		},
		"22063": {
			"short": "Livingston Parish",
			"long": "Livingston Parish, LA"
		},
		"22065": {
			"short": "Madison Parish",
			"long": "Madison Parish, LA"
		},
		"22067": {
			"short": "Morehouse Parish",
			"long": "Morehouse Parish, LA"
		},
		"22069": {
			"short": "Natchitoches Parish",
			"long": "Natchitoches Parish, LA"
		},
		"22071": {
			"short": "Orleans Parish",
			"long": "Orleans Parish, LA"
		},
		"22073": {
			"short": "Ouachita Parish",
			"long": "Ouachita Parish, LA"
		},
		"22075": {
			"short": "Plaquemines Parish",
			"long": "Plaquemines Parish, LA"
		},
		"22077": {
			"short": "Pointe Coupee Parish",
			"long": "Pointe Coupee Parish, LA"
		},
		"22079": {
			"short": "Rapides Parish",
			"long": "Rapides Parish, LA"
		},
		"22081": {
			"short": "Red River Parish",
			"long": "Red River Parish, LA"
		},
		"22083": {
			"short": "Richland Parish",
			"long": "Richland Parish, LA"
		},
		"22085": {
			"short": "Sabine Parish",
			"long": "Sabine Parish, LA"
		},
		"22087": {
			"short": "St. Bernard Parish",
			"long": "St. Bernard Parish, LA"
		},
		"22089": {
			"short": "St. Charles Parish",
			"long": "St. Charles Parish, LA"
		},
		"22091": {
			"short": "St. Helena Parish",
			"long": "St. Helena Parish, LA"
		},
		"22093": {
			"short": "St. James Parish",
			"long": "St. James Parish, LA"
		},
		"22095": {
			"short": "St. John the Baptist Parish",
			"long": "St. John the Baptist Parish, LA"
		},
		"22097": {
			"short": "St. Landry Parish",
			"long": "St. Landry Parish, LA"
		},
		"22099": {
			"short": "St. Martin Parish",
			"long": "St. Martin Parish, LA"
		},
		"22101": {
			"short": "St. Mary Parish",
			"long": "St. Mary Parish, LA"
		},
		"22103": {
			"short": "St. Tammany Parish",
			"long": "St. Tammany Parish, LA"
		},
		"22105": {
			"short": "Tangipahoa Parish",
			"long": "Tangipahoa Parish, LA"
		},
		"22107": {
			"short": "Tensas Parish",
			"long": "Tensas Parish, LA"
		},
		"22109": {
			"short": "Terrebonne Parish",
			"long": "Terrebonne Parish, LA"
		},
		"22111": {
			"short": "Union Parish",
			"long": "Union Parish, LA"
		},
		"22113": {
			"short": "Vermilion Parish",
			"long": "Vermilion Parish, LA"
		},
		"22115": {
			"short": "Vernon Parish",
			"long": "Vernon Parish, LA"
		},
		"22117": {
			"short": "Washington Parish",
			"long": "Washington Parish, LA"
		},
		"22119": {
			"short": "Webster Parish",
			"long": "Webster Parish, LA"
		},
		"22121": {
			"short": "West Baton Rouge Parish",
			"long": "West Baton Rouge Parish, LA"
		},
		"22123": {
			"short": "West Carroll Parish",
			"long": "West Carroll Parish, LA"
		},
		"22125": {
			"short": "West Feliciana Parish",
			"long": "West Feliciana Parish, LA"
		},
		"22127": {
			"short": "Winn Parish",
			"long": "Winn Parish, LA"
		},
		"23000": {
			"short": "ME",
			"long": "Maine"
		},
		"23001": {
			"short": "Androscoggin",
			"long": "Androscoggin County, ME"
		},
		"23003": {
			"short": "Aroostook",
			"long": "Aroostook County, ME"
		},
		"23005": {
			"short": "Cumberland",
			"long": "Cumberland County, ME"
		},
		"23007": {
			"short": "Franklin",
			"long": "Franklin County, ME"
		},
		"23009": {
			"short": "Hancock",
			"long": "Hancock County, ME"
		},
		"23011": {
			"short": "Kennebec",
			"long": "Kennebec County, ME"
		},
		"23013": {
			"short": "Knox",
			"long": "Knox County, ME"
		},
		"23015": {
			"short": "Lincoln",
			"long": "Lincoln County, ME"
		},
		"23017": {
			"short": "Oxford",
			"long": "Oxford County, ME"
		},
		"23019": {
			"short": "Penobscot",
			"long": "Penobscot County, ME"
		},
		"23021": {
			"short": "Piscataquis",
			"long": "Piscataquis County, ME"
		},
		"23023": {
			"short": "Sagadahoc",
			"long": "Sagadahoc County, ME"
		},
		"23025": {
			"short": "Somerset",
			"long": "Somerset County, ME"
		},
		"23027": {
			"short": "Waldo",
			"long": "Waldo County, ME"
		},
		"23029": {
			"short": "Washington",
			"long": "Washington County, ME"
		},
		"23031": {
			"short": "York",
			"long": "York County, ME"
		},
		"24000": {
			"short": "MD",
			"long": "Maryland"
		},
		"24001": {
			"short": "Allegany",
			"long": "Allegany County, MD"
		},
		"24003": {
			"short": "Anne Arundel",
			"long": "Anne Arundel County, MD"
		},
		"24005": {
			"short": "Baltimore",
			"long": "Baltimore County, MD"
		},
		"24009": {
			"short": "Calvert",
			"long": "Calvert County, MD"
		},
		"24011": {
			"short": "Caroline",
			"long": "Caroline County, MD"
		},
		"24013": {
			"short": "Carroll",
			"long": "Carroll County, MD"
		},
		"24015": {
			"short": "Cecil",
			"long": "Cecil County, MD"
		},
		"24017": {
			"short": "Charles",
			"long": "Charles County, MD"
		},
		"24019": {
			"short": "Dorchester",
			"long": "Dorchester County, MD"
		},
		"24021": {
			"short": "Frederick",
			"long": "Frederick County, MD"
		},
		"24023": {
			"short": "Garrett",
			"long": "Garrett County, MD"
		},
		"24025": {
			"short": "Harford",
			"long": "Harford County, MD"
		},
		"24027": {
			"short": "Howard",
			"long": "Howard County, MD"
		},
		"24029": {
			"short": "Kent",
			"long": "Kent County, MD"
		},
		"24031": {
			"short": "Montgomery",
			"long": "Montgomery County, MD"
		},
		"24033": {
			"short": "Prince George's",
			"long": "Prince George's County, MD"
		},
		"24035": {
			"short": "Queen Anne's",
			"long": "Queen Anne's County, MD"
		},
		"24037": {
			"short": "St. Mary's",
			"long": "St. Mary's County, MD"
		},
		"24039": {
			"short": "Somerset",
			"long": "Somerset County, MD"
		},
		"24041": {
			"short": "Talbot",
			"long": "Talbot County, MD"
		},
		"24043": {
			"short": "Washington",
			"long": "Washington County, MD"
		},
		"24045": {
			"short": "Wicomico",
			"long": "Wicomico County, MD"
		},
		"24047": {
			"short": "Worcester",
			"long": "Worcester County, MD"
		},
		"24510": {
			"short": "Baltimore city",
			"long": "Baltimore city, MD"
		},
		"25000": {
			"short": "MA",
			"long": "Massachusetts"
		},
		"25001": {
			"short": "Barnstable",
			"long": "Barnstable County, MA"
		},
		"25003": {
			"short": "Berkshire",
			"long": "Berkshire County, MA"
		},
		"25005": {
			"short": "Bristol",
			"long": "Bristol County, MA"
		},
		"25007": {
			"short": "Dukes",
			"long": "Dukes County, MA"
		},
		"25009": {
			"short": "Essex",
			"long": "Essex County, MA"
		},
		"25011": {
			"short": "Franklin",
			"long": "Franklin County, MA"
		},
		"25013": {
			"short": "Hampden",
			"long": "Hampden County, MA"
		},
		"25015": {
			"short": "Hampshire",
			"long": "Hampshire County, MA"
		},
		"25017": {
			"short": "Middlesex",
			"long": "Middlesex County, MA"
		},
		"25019": {
			"short": "Nantucket",
			"long": "Nantucket County, MA"
		},
		"25021": {
			"short": "Norfolk",
			"long": "Norfolk County, MA"
		},
		"25023": {
			"short": "Plymouth",
			"long": "Plymouth County, MA"
		},
		"25025": {
			"short": "Suffolk",
			"long": "Suffolk County, MA"
		},
		"25027": {
			"short": "Worcester",
			"long": "Worcester County, MA"
		},
		"26000": {
			"short": "MI",
			"long": "Michigan"
		},
		"26001": {
			"short": "Alcona",
			"long": "Alcona County, MI"
		},
		"26003": {
			"short": "Alger",
			"long": "Alger County, MI"
		},
		"26005": {
			"short": "Allegan",
			"long": "Allegan County, MI"
		},
		"26007": {
			"short": "Alpena",
			"long": "Alpena County, MI"
		},
		"26009": {
			"short": "Antrim",
			"long": "Antrim County, MI"
		},
		"26011": {
			"short": "Arenac",
			"long": "Arenac County, MI"
		},
		"26013": {
			"short": "Baraga",
			"long": "Baraga County, MI"
		},
		"26015": {
			"short": "Barry",
			"long": "Barry County, MI"
		},
		"26017": {
			"short": "Bay",
			"long": "Bay County, MI"
		},
		"26019": {
			"short": "Benzie",
			"long": "Benzie County, MI"
		},
		"26021": {
			"short": "Berrien",
			"long": "Berrien County, MI"
		},
		"26023": {
			"short": "Branch",
			"long": "Branch County, MI"
		},
		"26025": {
			"short": "Calhoun",
			"long": "Calhoun County, MI"
		},
		"26027": {
			"short": "Cass",
			"long": "Cass County, MI"
		},
		"26029": {
			"short": "Charlevoix",
			"long": "Charlevoix County, MI"
		},
		"26031": {
			"short": "Cheboygan",
			"long": "Cheboygan County, MI"
		},
		"26033": {
			"short": "Chippewa",
			"long": "Chippewa County, MI"
		},
		"26035": {
			"short": "Clare",
			"long": "Clare County, MI"
		},
		"26037": {
			"short": "Clinton",
			"long": "Clinton County, MI"
		},
		"26039": {
			"short": "Crawford",
			"long": "Crawford County, MI"
		},
		"26041": {
			"short": "Delta",
			"long": "Delta County, MI"
		},
		"26043": {
			"short": "Dickinson",
			"long": "Dickinson County, MI"
		},
		"26045": {
			"short": "Eaton",
			"long": "Eaton County, MI"
		},
		"26047": {
			"short": "Emmet",
			"long": "Emmet County, MI"
		},
		"26049": {
			"short": "Genesee",
			"long": "Genesee County, MI"
		},
		"26051": {
			"short": "Gladwin",
			"long": "Gladwin County, MI"
		},
		"26053": {
			"short": "Gogebic",
			"long": "Gogebic County, MI"
		},
		"26055": {
			"short": "Grand Traverse",
			"long": "Grand Traverse County, MI"
		},
		"26057": {
			"short": "Gratiot",
			"long": "Gratiot County, MI"
		},
		"26059": {
			"short": "Hillsdale",
			"long": "Hillsdale County, MI"
		},
		"26061": {
			"short": "Houghton",
			"long": "Houghton County, MI"
		},
		"26063": {
			"short": "Huron",
			"long": "Huron County, MI"
		},
		"26065": {
			"short": "Ingham",
			"long": "Ingham County, MI"
		},
		"26067": {
			"short": "Ionia",
			"long": "Ionia County, MI"
		},
		"26069": {
			"short": "Iosco",
			"long": "Iosco County, MI"
		},
		"26071": {
			"short": "Iron",
			"long": "Iron County, MI"
		},
		"26073": {
			"short": "Isabella",
			"long": "Isabella County, MI"
		},
		"26075": {
			"short": "Jackson",
			"long": "Jackson County, MI"
		},
		"26077": {
			"short": "Kalamazoo",
			"long": "Kalamazoo County, MI"
		},
		"26079": {
			"short": "Kalkaska",
			"long": "Kalkaska County, MI"
		},
		"26081": {
			"short": "Kent",
			"long": "Kent County, MI"
		},
		"26083": {
			"short": "Keweenaw",
			"long": "Keweenaw County, MI"
		},
		"26085": {
			"short": "Lake",
			"long": "Lake County, MI"
		},
		"26087": {
			"short": "Lapeer",
			"long": "Lapeer County, MI"
		},
		"26089": {
			"short": "Leelanau",
			"long": "Leelanau County, MI"
		},
		"26091": {
			"short": "Lenawee",
			"long": "Lenawee County, MI"
		},
		"26093": {
			"short": "Livingston",
			"long": "Livingston County, MI"
		},
		"26095": {
			"short": "Luce",
			"long": "Luce County, MI"
		},
		"26097": {
			"short": "Mackinac",
			"long": "Mackinac County, MI"
		},
		"26099": {
			"short": "Macomb",
			"long": "Macomb County, MI"
		},
		"26101": {
			"short": "Manistee",
			"long": "Manistee County, MI"
		},
		"26103": {
			"short": "Marquette",
			"long": "Marquette County, MI"
		},
		"26105": {
			"short": "Mason",
			"long": "Mason County, MI"
		},
		"26107": {
			"short": "Mecosta",
			"long": "Mecosta County, MI"
		},
		"26109": {
			"short": "Menominee",
			"long": "Menominee County, MI"
		},
		"26111": {
			"short": "Midland",
			"long": "Midland County, MI"
		},
		"26113": {
			"short": "Missaukee",
			"long": "Missaukee County, MI"
		},
		"26115": {
			"short": "Monroe",
			"long": "Monroe County, MI"
		},
		"26117": {
			"short": "Montcalm",
			"long": "Montcalm County, MI"
		},
		"26119": {
			"short": "Montmorency",
			"long": "Montmorency County, MI"
		},
		"26121": {
			"short": "Muskegon",
			"long": "Muskegon County, MI"
		},
		"26123": {
			"short": "Newaygo",
			"long": "Newaygo County, MI"
		},
		"26125": {
			"short": "Oakland",
			"long": "Oakland County, MI"
		},
		"26127": {
			"short": "Oceana",
			"long": "Oceana County, MI"
		},
		"26129": {
			"short": "Ogemaw",
			"long": "Ogemaw County, MI"
		},
		"26131": {
			"short": "Ontonagon",
			"long": "Ontonagon County, MI"
		},
		"26133": {
			"short": "Osceola",
			"long": "Osceola County, MI"
		},
		"26135": {
			"short": "Oscoda",
			"long": "Oscoda County, MI"
		},
		"26137": {
			"short": "Otsego",
			"long": "Otsego County, MI"
		},
		"26139": {
			"short": "Ottawa",
			"long": "Ottawa County, MI"
		},
		"26141": {
			"short": "Presque Isle",
			"long": "Presque Isle County, MI"
		},
		"26143": {
			"short": "Roscommon",
			"long": "Roscommon County, MI"
		},
		"26145": {
			"short": "Saginaw",
			"long": "Saginaw County, MI"
		},
		"26147": {
			"short": "St. Clair",
			"long": "St. Clair County, MI"
		},
		"26149": {
			"short": "St. Joseph",
			"long": "St. Joseph County, MI"
		},
		"26151": {
			"short": "Sanilac",
			"long": "Sanilac County, MI"
		},
		"26153": {
			"short": "Schoolcraft",
			"long": "Schoolcraft County, MI"
		},
		"26155": {
			"short": "Shiawassee",
			"long": "Shiawassee County, MI"
		},
		"26157": {
			"short": "Tuscola",
			"long": "Tuscola County, MI"
		},
		"26159": {
			"short": "Van Buren",
			"long": "Van Buren County, MI"
		},
		"26161": {
			"short": "Washtenaw",
			"long": "Washtenaw County, MI"
		},
		"26163": {
			"short": "Wayne",
			"long": "Wayne County, MI"
		},
		"26165": {
			"short": "Wexford",
			"long": "Wexford County, MI"
		},
		"27000": {
			"short": "MN",
			"long": "Minnesota"
		},
		"27001": {
			"short": "Aitkin",
			"long": "Aitkin County, MN"
		},
		"27003": {
			"short": "Anoka",
			"long": "Anoka County, MN"
		},
		"27005": {
			"short": "Becker",
			"long": "Becker County, MN"
		},
		"27007": {
			"short": "Beltrami",
			"long": "Beltrami County, MN"
		},
		"27009": {
			"short": "Benton",
			"long": "Benton County, MN"
		},
		"27011": {
			"short": "Big Stone",
			"long": "Big Stone County, MN"
		},
		"27013": {
			"short": "Blue Earth",
			"long": "Blue Earth County, MN"
		},
		"27015": {
			"short": "Brown",
			"long": "Brown County, MN"
		},
		"27017": {
			"short": "Carlton",
			"long": "Carlton County, MN"
		},
		"27019": {
			"short": "Carver",
			"long": "Carver County, MN"
		},
		"27021": {
			"short": "Cass",
			"long": "Cass County, MN"
		},
		"27023": {
			"short": "Chippewa",
			"long": "Chippewa County, MN"
		},
		"27025": {
			"short": "Chisago",
			"long": "Chisago County, MN"
		},
		"27027": {
			"short": "Clay",
			"long": "Clay County, MN"
		},
		"27029": {
			"short": "Clearwater",
			"long": "Clearwater County, MN"
		},
		"27031": {
			"short": "Cook",
			"long": "Cook County, MN"
		},
		"27033": {
			"short": "Cottonwood",
			"long": "Cottonwood County, MN"
		},
		"27035": {
			"short": "Crow Wing",
			"long": "Crow Wing County, MN"
		},
		"27037": {
			"short": "Dakota",
			"long": "Dakota County, MN"
		},
		"27039": {
			"short": "Dodge",
			"long": "Dodge County, MN"
		},
		"27041": {
			"short": "Douglas",
			"long": "Douglas County, MN"
		},
		"27043": {
			"short": "Faribault",
			"long": "Faribault County, MN"
		},
		"27045": {
			"short": "Fillmore",
			"long": "Fillmore County, MN"
		},
		"27047": {
			"short": "Freeborn",
			"long": "Freeborn County, MN"
		},
		"27049": {
			"short": "Goodhue",
			"long": "Goodhue County, MN"
		},
		"27051": {
			"short": "Grant",
			"long": "Grant County, MN"
		},
		"27053": {
			"short": "Hennepin",
			"long": "Hennepin County, MN"
		},
		"27055": {
			"short": "Houston",
			"long": "Houston County, MN"
		},
		"27057": {
			"short": "Hubbard",
			"long": "Hubbard County, MN"
		},
		"27059": {
			"short": "Isanti",
			"long": "Isanti County, MN"
		},
		"27061": {
			"short": "Itasca",
			"long": "Itasca County, MN"
		},
		"27063": {
			"short": "Jackson",
			"long": "Jackson County, MN"
		},
		"27065": {
			"short": "Kanabec",
			"long": "Kanabec County, MN"
		},
		"27067": {
			"short": "Kandiyohi",
			"long": "Kandiyohi County, MN"
		},
		"27069": {
			"short": "Kittson",
			"long": "Kittson County, MN"
		},
		"27071": {
			"short": "Koochiching",
			"long": "Koochiching County, MN"
		},
		"27073": {
			"short": "Lac qui Parle",
			"long": "Lac qui Parle County, MN"
		},
		"27075": {
			"short": "Lake",
			"long": "Lake County, MN"
		},
		"27077": {
			"short": "Lake of the Woods",
			"long": "Lake of the Woods County, MN"
		},
		"27079": {
			"short": "Le Sueur",
			"long": "Le Sueur County, MN"
		},
		"27081": {
			"short": "Lincoln",
			"long": "Lincoln County, MN"
		},
		"27083": {
			"short": "Lyon",
			"long": "Lyon County, MN"
		},
		"27085": {
			"short": "McLeod",
			"long": "McLeod County, MN"
		},
		"27087": {
			"short": "Mahnomen",
			"long": "Mahnomen County, MN"
		},
		"27089": {
			"short": "Marshall",
			"long": "Marshall County, MN"
		},
		"27091": {
			"short": "Martin",
			"long": "Martin County, MN"
		},
		"27093": {
			"short": "Meeker",
			"long": "Meeker County, MN"
		},
		"27095": {
			"short": "Mille Lacs",
			"long": "Mille Lacs County, MN"
		},
		"27097": {
			"short": "Morrison",
			"long": "Morrison County, MN"
		},
		"27099": {
			"short": "Mower",
			"long": "Mower County, MN"
		},
		"27101": {
			"short": "Murray",
			"long": "Murray County, MN"
		},
		"27103": {
			"short": "Nicollet",
			"long": "Nicollet County, MN"
		},
		"27105": {
			"short": "Nobles",
			"long": "Nobles County, MN"
		},
		"27107": {
			"short": "Norman",
			"long": "Norman County, MN"
		},
		"27109": {
			"short": "Olmsted",
			"long": "Olmsted County, MN"
		},
		"27111": {
			"short": "Otter Tail",
			"long": "Otter Tail County, MN"
		},
		"27113": {
			"short": "Pennington",
			"long": "Pennington County, MN"
		},
		"27115": {
			"short": "Pine",
			"long": "Pine County, MN"
		},
		"27117": {
			"short": "Pipestone",
			"long": "Pipestone County, MN"
		},
		"27119": {
			"short": "Polk",
			"long": "Polk County, MN"
		},
		"27121": {
			"short": "Pope",
			"long": "Pope County, MN"
		},
		"27123": {
			"short": "Ramsey",
			"long": "Ramsey County, MN"
		},
		"27125": {
			"short": "Red Lake",
			"long": "Red Lake County, MN"
		},
		"27127": {
			"short": "Redwood",
			"long": "Redwood County, MN"
		},
		"27129": {
			"short": "Renville",
			"long": "Renville County, MN"
		},
		"27131": {
			"short": "Rice",
			"long": "Rice County, MN"
		},
		"27133": {
			"short": "Rock",
			"long": "Rock County, MN"
		},
		"27135": {
			"short": "Roseau",
			"long": "Roseau County, MN"
		},
		"27137": {
			"short": "St. Louis",
			"long": "St. Louis County, MN"
		},
		"27139": {
			"short": "Scott",
			"long": "Scott County, MN"
		},
		"27141": {
			"short": "Sherburne",
			"long": "Sherburne County, MN"
		},
		"27143": {
			"short": "Sibley",
			"long": "Sibley County, MN"
		},
		"27145": {
			"short": "Stearns",
			"long": "Stearns County, MN"
		},
		"27147": {
			"short": "Steele",
			"long": "Steele County, MN"
		},
		"27149": {
			"short": "Stevens",
			"long": "Stevens County, MN"
		},
		"27151": {
			"short": "Swift",
			"long": "Swift County, MN"
		},
		"27153": {
			"short": "Todd",
			"long": "Todd County, MN"
		},
		"27155": {
			"short": "Traverse",
			"long": "Traverse County, MN"
		},
		"27157": {
			"short": "Wabasha",
			"long": "Wabasha County, MN"
		},
		"27159": {
			"short": "Wadena",
			"long": "Wadena County, MN"
		},
		"27161": {
			"short": "Waseca",
			"long": "Waseca County, MN"
		},
		"27163": {
			"short": "Washington",
			"long": "Washington County, MN"
		},
		"27165": {
			"short": "Watonwan",
			"long": "Watonwan County, MN"
		},
		"27167": {
			"short": "Wilkin",
			"long": "Wilkin County, MN"
		},
		"27169": {
			"short": "Winona",
			"long": "Winona County, MN"
		},
		"27171": {
			"short": "Wright",
			"long": "Wright County, MN"
		},
		"27173": {
			"short": "Yellow Medicine",
			"long": "Yellow Medicine County, MN"
		},
		"28000": {
			"short": "MS",
			"long": "Mississippi"
		},
		"28001": {
			"short": "Adams",
			"long": "Adams County, MS"
		},
		"28003": {
			"short": "Alcorn",
			"long": "Alcorn County, MS"
		},
		"28005": {
			"short": "Amite",
			"long": "Amite County, MS"
		},
		"28007": {
			"short": "Attala",
			"long": "Attala County, MS"
		},
		"28009": {
			"short": "Benton",
			"long": "Benton County, MS"
		},
		"28011": {
			"short": "Bolivar",
			"long": "Bolivar County, MS"
		},
		"28013": {
			"short": "Calhoun",
			"long": "Calhoun County, MS"
		},
		"28015": {
			"short": "Carroll",
			"long": "Carroll County, MS"
		},
		"28017": {
			"short": "Chickasaw",
			"long": "Chickasaw County, MS"
		},
		"28019": {
			"short": "Choctaw",
			"long": "Choctaw County, MS"
		},
		"28021": {
			"short": "Claiborne",
			"long": "Claiborne County, MS"
		},
		"28023": {
			"short": "Clarke",
			"long": "Clarke County, MS"
		},
		"28025": {
			"short": "Clay",
			"long": "Clay County, MS"
		},
		"28027": {
			"short": "Coahoma",
			"long": "Coahoma County, MS"
		},
		"28029": {
			"short": "Copiah",
			"long": "Copiah County, MS"
		},
		"28031": {
			"short": "Covington",
			"long": "Covington County, MS"
		},
		"28033": {
			"short": "DeSoto",
			"long": "DeSoto County, MS"
		},
		"28035": {
			"short": "Forrest",
			"long": "Forrest County, MS"
		},
		"28037": {
			"short": "Franklin",
			"long": "Franklin County, MS"
		},
		"28039": {
			"short": "George",
			"long": "George County, MS"
		},
		"28041": {
			"short": "Greene",
			"long": "Greene County, MS"
		},
		"28043": {
			"short": "Grenada",
			"long": "Grenada County, MS"
		},
		"28045": {
			"short": "Hancock",
			"long": "Hancock County, MS"
		},
		"28047": {
			"short": "Harrison",
			"long": "Harrison County, MS"
		},
		"28049": {
			"short": "Hinds",
			"long": "Hinds County, MS"
		},
		"28051": {
			"short": "Holmes",
			"long": "Holmes County, MS"
		},
		"28053": {
			"short": "Humphreys",
			"long": "Humphreys County, MS"
		},
		"28055": {
			"short": "Issaquena",
			"long": "Issaquena County, MS"
		},
		"28057": {
			"short": "Itawamba",
			"long": "Itawamba County, MS"
		},
		"28059": {
			"short": "Jackson",
			"long": "Jackson County, MS"
		},
		"28061": {
			"short": "Jasper",
			"long": "Jasper County, MS"
		},
		"28063": {
			"short": "Jefferson",
			"long": "Jefferson County, MS"
		},
		"28065": {
			"short": "Jefferson Davis",
			"long": "Jefferson Davis County, MS"
		},
		"28067": {
			"short": "Jones",
			"long": "Jones County, MS"
		},
		"28069": {
			"short": "Kemper",
			"long": "Kemper County, MS"
		},
		"28071": {
			"short": "Lafayette",
			"long": "Lafayette County, MS"
		},
		"28073": {
			"short": "Lamar",
			"long": "Lamar County, MS"
		},
		"28075": {
			"short": "Lauderdale",
			"long": "Lauderdale County, MS"
		},
		"28077": {
			"short": "Lawrence",
			"long": "Lawrence County, MS"
		},
		"28079": {
			"short": "Leake",
			"long": "Leake County, MS"
		},
		"28081": {
			"short": "Lee",
			"long": "Lee County, MS"
		},
		"28083": {
			"short": "Leflore",
			"long": "Leflore County, MS"
		},
		"28085": {
			"short": "Lincoln",
			"long": "Lincoln County, MS"
		},
		"28087": {
			"short": "Lowndes",
			"long": "Lowndes County, MS"
		},
		"28089": {
			"short": "Madison",
			"long": "Madison County, MS"
		},
		"28091": {
			"short": "Marion",
			"long": "Marion County, MS"
		},
		"28093": {
			"short": "Marshall",
			"long": "Marshall County, MS"
		},
		"28095": {
			"short": "Monroe",
			"long": "Monroe County, MS"
		},
		"28097": {
			"short": "Montgomery",
			"long": "Montgomery County, MS"
		},
		"28099": {
			"short": "Neshoba",
			"long": "Neshoba County, MS"
		},
		"28101": {
			"short": "Newton",
			"long": "Newton County, MS"
		},
		"28103": {
			"short": "Noxubee",
			"long": "Noxubee County, MS"
		},
		"28105": {
			"short": "Oktibbeha",
			"long": "Oktibbeha County, MS"
		},
		"28107": {
			"short": "Panola",
			"long": "Panola County, MS"
		},
		"28109": {
			"short": "Pearl River",
			"long": "Pearl River County, MS"
		},
		"28111": {
			"short": "Perry",
			"long": "Perry County, MS"
		},
		"28113": {
			"short": "Pike",
			"long": "Pike County, MS"
		},
		"28115": {
			"short": "Pontotoc",
			"long": "Pontotoc County, MS"
		},
		"28117": {
			"short": "Prentiss",
			"long": "Prentiss County, MS"
		},
		"28119": {
			"short": "Quitman",
			"long": "Quitman County, MS"
		},
		"28121": {
			"short": "Rankin",
			"long": "Rankin County, MS"
		},
		"28123": {
			"short": "Scott",
			"long": "Scott County, MS"
		},
		"28125": {
			"short": "Sharkey",
			"long": "Sharkey County, MS"
		},
		"28127": {
			"short": "Simpson",
			"long": "Simpson County, MS"
		},
		"28129": {
			"short": "Smith",
			"long": "Smith County, MS"
		},
		"28131": {
			"short": "Stone",
			"long": "Stone County, MS"
		},
		"28133": {
			"short": "Sunflower",
			"long": "Sunflower County, MS"
		},
		"28135": {
			"short": "Tallahatchie",
			"long": "Tallahatchie County, MS"
		},
		"28137": {
			"short": "Tate",
			"long": "Tate County, MS"
		},
		"28139": {
			"short": "Tippah",
			"long": "Tippah County, MS"
		},
		"28141": {
			"short": "Tishomingo",
			"long": "Tishomingo County, MS"
		},
		"28143": {
			"short": "Tunica",
			"long": "Tunica County, MS"
		},
		"28145": {
			"short": "Union",
			"long": "Union County, MS"
		},
		"28147": {
			"short": "Walthall",
			"long": "Walthall County, MS"
		},
		"28149": {
			"short": "Warren",
			"long": "Warren County, MS"
		},
		"28151": {
			"short": "Washington",
			"long": "Washington County, MS"
		},
		"28153": {
			"short": "Wayne",
			"long": "Wayne County, MS"
		},
		"28155": {
			"short": "Webster",
			"long": "Webster County, MS"
		},
		"28157": {
			"short": "Wilkinson",
			"long": "Wilkinson County, MS"
		},
		"28159": {
			"short": "Winston",
			"long": "Winston County, MS"
		},
		"28161": {
			"short": "Yalobusha",
			"long": "Yalobusha County, MS"
		},
		"28163": {
			"short": "Yazoo",
			"long": "Yazoo County, MS"
		},
		"29000": {
			"short": "MO",
			"long": "Missouri"
		},
		"29001": {
			"short": "Adair",
			"long": "Adair County, MO"
		},
		"29003": {
			"short": "Andrew",
			"long": "Andrew County, MO"
		},
		"29005": {
			"short": "Atchison",
			"long": "Atchison County, MO"
		},
		"29007": {
			"short": "Audrain",
			"long": "Audrain County, MO"
		},
		"29009": {
			"short": "Barry",
			"long": "Barry County, MO"
		},
		"29011": {
			"short": "Barton",
			"long": "Barton County, MO"
		},
		"29013": {
			"short": "Bates",
			"long": "Bates County, MO"
		},
		"29015": {
			"short": "Benton",
			"long": "Benton County, MO"
		},
		"29017": {
			"short": "Bollinger",
			"long": "Bollinger County, MO"
		},
		"29019": {
			"short": "Boone",
			"long": "Boone County, MO"
		},
		"29021": {
			"short": "Buchanan",
			"long": "Buchanan County, MO"
		},
		"29023": {
			"short": "Butler",
			"long": "Butler County, MO"
		},
		"29025": {
			"short": "Caldwell",
			"long": "Caldwell County, MO"
		},
		"29027": {
			"short": "Callaway",
			"long": "Callaway County, MO"
		},
		"29029": {
			"short": "Camden",
			"long": "Camden County, MO"
		},
		"29031": {
			"short": "Cape Girardeau",
			"long": "Cape Girardeau County, MO"
		},
		"29033": {
			"short": "Carroll",
			"long": "Carroll County, MO"
		},
		"29035": {
			"short": "Carter",
			"long": "Carter County, MO"
		},
		"29037": {
			"short": "Cass",
			"long": "Cass County, MO"
		},
		"29039": {
			"short": "Cedar",
			"long": "Cedar County, MO"
		},
		"29041": {
			"short": "Chariton",
			"long": "Chariton County, MO"
		},
		"29043": {
			"short": "Christian",
			"long": "Christian County, MO"
		},
		"29045": {
			"short": "Clark",
			"long": "Clark County, MO"
		},
		"29047": {
			"short": "Clay",
			"long": "Clay County, MO"
		},
		"29049": {
			"short": "Clinton",
			"long": "Clinton County, MO"
		},
		"29051": {
			"short": "Cole",
			"long": "Cole County, MO"
		},
		"29053": {
			"short": "Cooper",
			"long": "Cooper County, MO"
		},
		"29055": {
			"short": "Crawford",
			"long": "Crawford County, MO"
		},
		"29057": {
			"short": "Dade",
			"long": "Dade County, MO"
		},
		"29059": {
			"short": "Dallas",
			"long": "Dallas County, MO"
		},
		"29061": {
			"short": "Daviess",
			"long": "Daviess County, MO"
		},
		"29063": {
			"short": "DeKalb",
			"long": "DeKalb County, MO"
		},
		"29065": {
			"short": "Dent",
			"long": "Dent County, MO"
		},
		"29067": {
			"short": "Douglas",
			"long": "Douglas County, MO"
		},
		"29069": {
			"short": "Dunklin",
			"long": "Dunklin County, MO"
		},
		"29071": {
			"short": "Franklin",
			"long": "Franklin County, MO"
		},
		"29073": {
			"short": "Gasconade",
			"long": "Gasconade County, MO"
		},
		"29075": {
			"short": "Gentry",
			"long": "Gentry County, MO"
		},
		"29077": {
			"short": "Greene",
			"long": "Greene County, MO"
		},
		"29079": {
			"short": "Grundy",
			"long": "Grundy County, MO"
		},
		"29081": {
			"short": "Harrison",
			"long": "Harrison County, MO"
		},
		"29083": {
			"short": "Henry",
			"long": "Henry County, MO"
		},
		"29085": {
			"short": "Hickory",
			"long": "Hickory County, MO"
		},
		"29087": {
			"short": "Holt",
			"long": "Holt County, MO"
		},
		"29089": {
			"short": "Howard",
			"long": "Howard County, MO"
		},
		"29091": {
			"short": "Howell",
			"long": "Howell County, MO"
		},
		"29093": {
			"short": "Iron",
			"long": "Iron County, MO"
		},
		"29095": {
			"short": "Jackson",
			"long": "Jackson County, MO"
		},
		"29097": {
			"short": "Jasper",
			"long": "Jasper County, MO"
		},
		"29099": {
			"short": "Jefferson",
			"long": "Jefferson County, MO"
		},
		"29101": {
			"short": "Johnson",
			"long": "Johnson County, MO"
		},
		"29103": {
			"short": "Knox",
			"long": "Knox County, MO"
		},
		"29105": {
			"short": "Laclede",
			"long": "Laclede County, MO"
		},
		"29107": {
			"short": "Lafayette",
			"long": "Lafayette County, MO"
		},
		"29109": {
			"short": "Lawrence",
			"long": "Lawrence County, MO"
		},
		"29111": {
			"short": "Lewis",
			"long": "Lewis County, MO"
		},
		"29113": {
			"short": "Lincoln",
			"long": "Lincoln County, MO"
		},
		"29115": {
			"short": "Linn",
			"long": "Linn County, MO"
		},
		"29117": {
			"short": "Livingston",
			"long": "Livingston County, MO"
		},
		"29119": {
			"short": "McDonald",
			"long": "McDonald County, MO"
		},
		"29121": {
			"short": "Macon",
			"long": "Macon County, MO"
		},
		"29123": {
			"short": "Madison",
			"long": "Madison County, MO"
		},
		"29125": {
			"short": "Maries",
			"long": "Maries County, MO"
		},
		"29127": {
			"short": "Marion",
			"long": "Marion County, MO"
		},
		"29129": {
			"short": "Mercer",
			"long": "Mercer County, MO"
		},
		"29131": {
			"short": "Miller",
			"long": "Miller County, MO"
		},
		"29133": {
			"short": "Mississippi",
			"long": "Mississippi County, MO"
		},
		"29135": {
			"short": "Moniteau",
			"long": "Moniteau County, MO"
		},
		"29137": {
			"short": "Monroe",
			"long": "Monroe County, MO"
		},
		"29139": {
			"short": "Montgomery",
			"long": "Montgomery County, MO"
		},
		"29141": {
			"short": "Morgan",
			"long": "Morgan County, MO"
		},
		"29143": {
			"short": "New Madrid",
			"long": "New Madrid County, MO"
		},
		"29145": {
			"short": "Newton",
			"long": "Newton County, MO"
		},
		"29147": {
			"short": "Nodaway",
			"long": "Nodaway County, MO"
		},
		"29149": {
			"short": "Oregon",
			"long": "Oregon County, MO"
		},
		"29151": {
			"short": "Osage",
			"long": "Osage County, MO"
		},
		"29153": {
			"short": "Ozark",
			"long": "Ozark County, MO"
		},
		"29155": {
			"short": "Pemiscot",
			"long": "Pemiscot County, MO"
		},
		"29157": {
			"short": "Perry",
			"long": "Perry County, MO"
		},
		"29159": {
			"short": "Pettis",
			"long": "Pettis County, MO"
		},
		"29161": {
			"short": "Phelps",
			"long": "Phelps County, MO"
		},
		"29163": {
			"short": "Pike",
			"long": "Pike County, MO"
		},
		"29165": {
			"short": "Platte",
			"long": "Platte County, MO"
		},
		"29167": {
			"short": "Polk",
			"long": "Polk County, MO"
		},
		"29169": {
			"short": "Pulaski",
			"long": "Pulaski County, MO"
		},
		"29171": {
			"short": "Putnam",
			"long": "Putnam County, MO"
		},
		"29173": {
			"short": "Ralls",
			"long": "Ralls County, MO"
		},
		"29175": {
			"short": "Randolph",
			"long": "Randolph County, MO"
		},
		"29177": {
			"short": "Ray",
			"long": "Ray County, MO"
		},
		"29179": {
			"short": "Reynolds",
			"long": "Reynolds County, MO"
		},
		"29181": {
			"short": "Ripley",
			"long": "Ripley County, MO"
		},
		"29183": {
			"short": "St. Charles",
			"long": "St. Charles County, MO"
		},
		"29185": {
			"short": "St. Clair",
			"long": "St. Clair County, MO"
		},
		"29186": {
			"short": "Ste. Genevieve",
			"long": "Ste. Genevieve County, MO"
		},
		"29187": {
			"short": "St. Francois",
			"long": "St. Francois County, MO"
		},
		"29189": {
			"short": "St. Louis",
			"long": "St. Louis County, MO"
		},
		"29195": {
			"short": "Saline",
			"long": "Saline County, MO"
		},
		"29197": {
			"short": "Schuyler",
			"long": "Schuyler County, MO"
		},
		"29199": {
			"short": "Scotland",
			"long": "Scotland County, MO"
		},
		"29201": {
			"short": "Scott",
			"long": "Scott County, MO"
		},
		"29203": {
			"short": "Shannon",
			"long": "Shannon County, MO"
		},
		"29205": {
			"short": "Shelby",
			"long": "Shelby County, MO"
		},
		"29207": {
			"short": "Stoddard",
			"long": "Stoddard County, MO"
		},
		"29209": {
			"short": "Stone",
			"long": "Stone County, MO"
		},
		"29211": {
			"short": "Sullivan",
			"long": "Sullivan County, MO"
		},
		"29213": {
			"short": "Taney",
			"long": "Taney County, MO"
		},
		"29215": {
			"short": "Texas",
			"long": "Texas County, MO"
		},
		"29217": {
			"short": "Vernon",
			"long": "Vernon County, MO"
		},
		"29219": {
			"short": "Warren",
			"long": "Warren County, MO"
		},
		"29221": {
			"short": "Washington",
			"long": "Washington County, MO"
		},
		"29223": {
			"short": "Wayne",
			"long": "Wayne County, MO"
		},
		"29225": {
			"short": "Webster",
			"long": "Webster County, MO"
		},
		"29227": {
			"short": "Worth",
			"long": "Worth County, MO"
		},
		"29229": {
			"short": "Wright",
			"long": "Wright County, MO"
		},
		"29510": {
			"short": "St. Louis city",
			"long": "St. Louis city, MO"
		},
		"30000": {
			"short": "MT",
			"long": "Montana"
		},
		"30001": {
			"short": "Beaverhead",
			"long": "Beaverhead County, MT"
		},
		"30003": {
			"short": "Big Horn",
			"long": "Big Horn County, MT"
		},
		"30005": {
			"short": "Blaine",
			"long": "Blaine County, MT"
		},
		"30007": {
			"short": "Broadwater",
			"long": "Broadwater County, MT"
		},
		"30009": {
			"short": "Carbon",
			"long": "Carbon County, MT"
		},
		"30011": {
			"short": "Carter",
			"long": "Carter County, MT"
		},
		"30013": {
			"short": "Cascade",
			"long": "Cascade County, MT"
		},
		"30015": {
			"short": "Chouteau",
			"long": "Chouteau County, MT"
		},
		"30017": {
			"short": "Custer",
			"long": "Custer County, MT"
		},
		"30019": {
			"short": "Daniels",
			"long": "Daniels County, MT"
		},
		"30021": {
			"short": "Dawson",
			"long": "Dawson County, MT"
		},
		"30023": {
			"short": "Deer Lodge",
			"long": "Deer Lodge County, MT"
		},
		"30025": {
			"short": "Fallon",
			"long": "Fallon County, MT"
		},
		"30027": {
			"short": "Fergus",
			"long": "Fergus County, MT"
		},
		"30029": {
			"short": "Flathead",
			"long": "Flathead County, MT"
		},
		"30031": {
			"short": "Gallatin",
			"long": "Gallatin County, MT"
		},
		"30033": {
			"short": "Garfield",
			"long": "Garfield County, MT"
		},
		"30035": {
			"short": "Glacier",
			"long": "Glacier County, MT"
		},
		"30037": {
			"short": "Golden Valley",
			"long": "Golden Valley County, MT"
		},
		"30039": {
			"short": "Granite",
			"long": "Granite County, MT"
		},
		"30041": {
			"short": "Hill",
			"long": "Hill County, MT"
		},
		"30043": {
			"short": "Jefferson",
			"long": "Jefferson County, MT"
		},
		"30045": {
			"short": "Judith Basin",
			"long": "Judith Basin County, MT"
		},
		"30047": {
			"short": "Lake",
			"long": "Lake County, MT"
		},
		"30049": {
			"short": "Lewis and Clark",
			"long": "Lewis and Clark County, MT"
		},
		"30051": {
			"short": "Liberty",
			"long": "Liberty County, MT"
		},
		"30053": {
			"short": "Lincoln",
			"long": "Lincoln County, MT"
		},
		"30055": {
			"short": "McCone",
			"long": "McCone County, MT"
		},
		"30057": {
			"short": "Madison",
			"long": "Madison County, MT"
		},
		"30059": {
			"short": "Meagher",
			"long": "Meagher County, MT"
		},
		"30061": {
			"short": "Mineral",
			"long": "Mineral County, MT"
		},
		"30063": {
			"short": "Missoula",
			"long": "Missoula County, MT"
		},
		"30065": {
			"short": "Musselshell",
			"long": "Musselshell County, MT"
		},
		"30067": {
			"short": "Park",
			"long": "Park County, MT"
		},
		"30069": {
			"short": "Petroleum",
			"long": "Petroleum County, MT"
		},
		"30071": {
			"short": "Phillips",
			"long": "Phillips County, MT"
		},
		"30073": {
			"short": "Pondera",
			"long": "Pondera County, MT"
		},
		"30075": {
			"short": "Powder River",
			"long": "Powder River County, MT"
		},
		"30077": {
			"short": "Powell",
			"long": "Powell County, MT"
		},
		"30079": {
			"short": "Prairie",
			"long": "Prairie County, MT"
		},
		"30081": {
			"short": "Ravalli",
			"long": "Ravalli County, MT"
		},
		"30083": {
			"short": "Richland",
			"long": "Richland County, MT"
		},
		"30085": {
			"short": "Roosevelt",
			"long": "Roosevelt County, MT"
		},
		"30087": {
			"short": "Rosebud",
			"long": "Rosebud County, MT"
		},
		"30089": {
			"short": "Sanders",
			"long": "Sanders County, MT"
		},
		"30091": {
			"short": "Sheridan",
			"long": "Sheridan County, MT"
		},
		"30093": {
			"short": "Silver Bow",
			"long": "Silver Bow County, MT"
		},
		"30095": {
			"short": "Stillwater",
			"long": "Stillwater County, MT"
		},
		"30097": {
			"short": "Sweet Grass",
			"long": "Sweet Grass County, MT"
		},
		"30099": {
			"short": "Teton",
			"long": "Teton County, MT"
		},
		"30101": {
			"short": "Toole",
			"long": "Toole County, MT"
		},
		"30103": {
			"short": "Treasure",
			"long": "Treasure County, MT"
		},
		"30105": {
			"short": "Valley",
			"long": "Valley County, MT"
		},
		"30107": {
			"short": "Wheatland",
			"long": "Wheatland County, MT"
		},
		"30109": {
			"short": "Wibaux",
			"long": "Wibaux County, MT"
		},
		"30111": {
			"short": "Yellowstone",
			"long": "Yellowstone County, MT"
		},
		"31000": {
			"short": "NE",
			"long": "Nebraska"
		},
		"31001": {
			"short": "Adams",
			"long": "Adams County, NE"
		},
		"31003": {
			"short": "Antelope",
			"long": "Antelope County, NE"
		},
		"31005": {
			"short": "Arthur",
			"long": "Arthur County, NE"
		},
		"31007": {
			"short": "Banner",
			"long": "Banner County, NE"
		},
		"31009": {
			"short": "Blaine",
			"long": "Blaine County, NE"
		},
		"31011": {
			"short": "Boone",
			"long": "Boone County, NE"
		},
		"31013": {
			"short": "Box Butte",
			"long": "Box Butte County, NE"
		},
		"31015": {
			"short": "Boyd",
			"long": "Boyd County, NE"
		},
		"31017": {
			"short": "Brown",
			"long": "Brown County, NE"
		},
		"31019": {
			"short": "Buffalo",
			"long": "Buffalo County, NE"
		},
		"31021": {
			"short": "Burt",
			"long": "Burt County, NE"
		},
		"31023": {
			"short": "Butler",
			"long": "Butler County, NE"
		},
		"31025": {
			"short": "Cass",
			"long": "Cass County, NE"
		},
		"31027": {
			"short": "Cedar",
			"long": "Cedar County, NE"
		},
		"31029": {
			"short": "Chase",
			"long": "Chase County, NE"
		},
		"31031": {
			"short": "Cherry",
			"long": "Cherry County, NE"
		},
		"31033": {
			"short": "Cheyenne",
			"long": "Cheyenne County, NE"
		},
		"31035": {
			"short": "Clay",
			"long": "Clay County, NE"
		},
		"31037": {
			"short": "Colfax",
			"long": "Colfax County, NE"
		},
		"31039": {
			"short": "Cuming",
			"long": "Cuming County, NE"
		},
		"31041": {
			"short": "Custer",
			"long": "Custer County, NE"
		},
		"31043": {
			"short": "Dakota",
			"long": "Dakota County, NE"
		},
		"31045": {
			"short": "Dawes",
			"long": "Dawes County, NE"
		},
		"31047": {
			"short": "Dawson",
			"long": "Dawson County, NE"
		},
		"31049": {
			"short": "Deuel",
			"long": "Deuel County, NE"
		},
		"31051": {
			"short": "Dixon",
			"long": "Dixon County, NE"
		},
		"31053": {
			"short": "Dodge",
			"long": "Dodge County, NE"
		},
		"31055": {
			"short": "Douglas",
			"long": "Douglas County, NE"
		},
		"31057": {
			"short": "Dundy",
			"long": "Dundy County, NE"
		},
		"31059": {
			"short": "Fillmore",
			"long": "Fillmore County, NE"
		},
		"31061": {
			"short": "Franklin",
			"long": "Franklin County, NE"
		},
		"31063": {
			"short": "Frontier",
			"long": "Frontier County, NE"
		},
		"31065": {
			"short": "Furnas",
			"long": "Furnas County, NE"
		},
		"31067": {
			"short": "Gage",
			"long": "Gage County, NE"
		},
		"31069": {
			"short": "Garden",
			"long": "Garden County, NE"
		},
		"31071": {
			"short": "Garfield",
			"long": "Garfield County, NE"
		},
		"31073": {
			"short": "Gosper",
			"long": "Gosper County, NE"
		},
		"31075": {
			"short": "Grant",
			"long": "Grant County, NE"
		},
		"31077": {
			"short": "Greeley",
			"long": "Greeley County, NE"
		},
		"31079": {
			"short": "Hall",
			"long": "Hall County, NE"
		},
		"31081": {
			"short": "Hamilton",
			"long": "Hamilton County, NE"
		},
		"31083": {
			"short": "Harlan",
			"long": "Harlan County, NE"
		},
		"31085": {
			"short": "Hayes",
			"long": "Hayes County, NE"
		},
		"31087": {
			"short": "Hitchcock",
			"long": "Hitchcock County, NE"
		},
		"31089": {
			"short": "Holt",
			"long": "Holt County, NE"
		},
		"31091": {
			"short": "Hooker",
			"long": "Hooker County, NE"
		},
		"31093": {
			"short": "Howard",
			"long": "Howard County, NE"
		},
		"31095": {
			"short": "Jefferson",
			"long": "Jefferson County, NE"
		},
		"31097": {
			"short": "Johnson",
			"long": "Johnson County, NE"
		},
		"31099": {
			"short": "Kearney",
			"long": "Kearney County, NE"
		},
		"31101": {
			"short": "Keith",
			"long": "Keith County, NE"
		},
		"31103": {
			"short": "Keya Paha",
			"long": "Keya Paha County, NE"
		},
		"31105": {
			"short": "Kimball",
			"long": "Kimball County, NE"
		},
		"31107": {
			"short": "Knox",
			"long": "Knox County, NE"
		},
		"31109": {
			"short": "Lancaster",
			"long": "Lancaster County, NE"
		},
		"31111": {
			"short": "Lincoln",
			"long": "Lincoln County, NE"
		},
		"31113": {
			"short": "Logan",
			"long": "Logan County, NE"
		},
		"31115": {
			"short": "Loup",
			"long": "Loup County, NE"
		},
		"31117": {
			"short": "McPherson",
			"long": "McPherson County, NE"
		},
		"31119": {
			"short": "Madison",
			"long": "Madison County, NE"
		},
		"31121": {
			"short": "Merrick",
			"long": "Merrick County, NE"
		},
		"31123": {
			"short": "Morrill",
			"long": "Morrill County, NE"
		},
		"31125": {
			"short": "Nance",
			"long": "Nance County, NE"
		},
		"31127": {
			"short": "Nemaha",
			"long": "Nemaha County, NE"
		},
		"31129": {
			"short": "Nuckolls",
			"long": "Nuckolls County, NE"
		},
		"31131": {
			"short": "Otoe",
			"long": "Otoe County, NE"
		},
		"31133": {
			"short": "Pawnee",
			"long": "Pawnee County, NE"
		},
		"31135": {
			"short": "Perkins",
			"long": "Perkins County, NE"
		},
		"31137": {
			"short": "Phelps",
			"long": "Phelps County, NE"
		},
		"31139": {
			"short": "Pierce",
			"long": "Pierce County, NE"
		},
		"31141": {
			"short": "Platte",
			"long": "Platte County, NE"
		},
		"31143": {
			"short": "Polk",
			"long": "Polk County, NE"
		},
		"31145": {
			"short": "Red Willow",
			"long": "Red Willow County, NE"
		},
		"31147": {
			"short": "Richardson",
			"long": "Richardson County, NE"
		},
		"31149": {
			"short": "Rock",
			"long": "Rock County, NE"
		},
		"31151": {
			"short": "Saline",
			"long": "Saline County, NE"
		},
		"31153": {
			"short": "Sarpy",
			"long": "Sarpy County, NE"
		},
		"31155": {
			"short": "Saunders",
			"long": "Saunders County, NE"
		},
		"31157": {
			"short": "Scotts Bluff",
			"long": "Scotts Bluff County, NE"
		},
		"31159": {
			"short": "Seward",
			"long": "Seward County, NE"
		},
		"31161": {
			"short": "Sheridan",
			"long": "Sheridan County, NE"
		},
		"31163": {
			"short": "Sherman",
			"long": "Sherman County, NE"
		},
		"31165": {
			"short": "Sioux",
			"long": "Sioux County, NE"
		},
		"31167": {
			"short": "Stanton",
			"long": "Stanton County, NE"
		},
		"31169": {
			"short": "Thayer",
			"long": "Thayer County, NE"
		},
		"31171": {
			"short": "Thomas",
			"long": "Thomas County, NE"
		},
		"31173": {
			"short": "Thurston",
			"long": "Thurston County, NE"
		},
		"31175": {
			"short": "Valley",
			"long": "Valley County, NE"
		},
		"31177": {
			"short": "Washington",
			"long": "Washington County, NE"
		},
		"31179": {
			"short": "Wayne",
			"long": "Wayne County, NE"
		},
		"31181": {
			"short": "Webster",
			"long": "Webster County, NE"
		},
		"31183": {
			"short": "Wheeler",
			"long": "Wheeler County, NE"
		},
		"31185": {
			"short": "York",
			"long": "York County, NE"
		},
		"32000": {
			"short": "NV",
			"long": "Nevada"
		},
		"32001": {
			"short": "Churchill",
			"long": "Churchill County, NV"
		},
		"32003": {
			"short": "Clark",
			"long": "Clark County, NV"
		},
		"32005": {
			"short": "Douglas",
			"long": "Douglas County, NV"
		},
		"32007": {
			"short": "Elko",
			"long": "Elko County, NV"
		},
		"32009": {
			"short": "Esmeralda",
			"long": "Esmeralda County, NV"
		},
		"32011": {
			"short": "Eureka",
			"long": "Eureka County, NV"
		},
		"32013": {
			"short": "Humboldt",
			"long": "Humboldt County, NV"
		},
		"32015": {
			"short": "Lander",
			"long": "Lander County, NV"
		},
		"32017": {
			"short": "Lincoln",
			"long": "Lincoln County, NV"
		},
		"32019": {
			"short": "Lyon",
			"long": "Lyon County, NV"
		},
		"32021": {
			"short": "Mineral",
			"long": "Mineral County, NV"
		},
		"32023": {
			"short": "Nye",
			"long": "Nye County, NV"
		},
		"32027": {
			"short": "Pershing",
			"long": "Pershing County, NV"
		},
		"32029": {
			"short": "Storey",
			"long": "Storey County, NV"
		},
		"32031": {
			"short": "Washoe",
			"long": "Washoe County, NV"
		},
		"32033": {
			"short": "White Pine",
			"long": "White Pine County, NV"
		},
		"32510": {
			"short": "Carson City",
			"long": "Carson City, NV"
		},
		"33000": {
			"short": "NH",
			"long": "New Hampshire"
		},
		"33001": {
			"short": "Belknap",
			"long": "Belknap County, NH"
		},
		"33003": {
			"short": "Carroll",
			"long": "Carroll County, NH"
		},
		"33005": {
			"short": "Cheshire",
			"long": "Cheshire County, NH"
		},
		"33007": {
			"short": "Coos",
			"long": "Coos County, NH"
		},
		"33009": {
			"short": "Grafton",
			"long": "Grafton County, NH"
		},
		"33011": {
			"short": "Hillsborough",
			"long": "Hillsborough County, NH"
		},
		"33013": {
			"short": "Merrimack",
			"long": "Merrimack County, NH"
		},
		"33015": {
			"short": "Rockingham",
			"long": "Rockingham County, NH"
		},
		"33017": {
			"short": "Strafford",
			"long": "Strafford County, NH"
		},
		"33019": {
			"short": "Sullivan",
			"long": "Sullivan County, NH"
		},
		"34000": {
			"short": "NJ",
			"long": "New Jersey"
		},
		"34001": {
			"short": "Atlantic",
			"long": "Atlantic County, NJ"
		},
		"34003": {
			"short": "Bergen",
			"long": "Bergen County, NJ"
		},
		"34005": {
			"short": "Burlington",
			"long": "Burlington County, NJ"
		},
		"34007": {
			"short": "Camden",
			"long": "Camden County, NJ"
		},
		"34009": {
			"short": "Cape May",
			"long": "Cape May County, NJ"
		},
		"34011": {
			"short": "Cumberland",
			"long": "Cumberland County, NJ"
		},
		"34013": {
			"short": "Essex",
			"long": "Essex County, NJ"
		},
		"34015": {
			"short": "Gloucester",
			"long": "Gloucester County, NJ"
		},
		"34017": {
			"short": "Hudson",
			"long": "Hudson County, NJ"
		},
		"34019": {
			"short": "Hunterdon",
			"long": "Hunterdon County, NJ"
		},
		"34021": {
			"short": "Mercer",
			"long": "Mercer County, NJ"
		},
		"34023": {
			"short": "Middlesex",
			"long": "Middlesex County, NJ"
		},
		"34025": {
			"short": "Monmouth",
			"long": "Monmouth County, NJ"
		},
		"34027": {
			"short": "Morris",
			"long": "Morris County, NJ"
		},
		"34029": {
			"short": "Ocean",
			"long": "Ocean County, NJ"
		},
		"34031": {
			"short": "Passaic",
			"long": "Passaic County, NJ"
		},
		"34033": {
			"short": "Salem",
			"long": "Salem County, NJ"
		},
		"34035": {
			"short": "Somerset",
			"long": "Somerset County, NJ"
		},
		"34037": {
			"short": "Sussex",
			"long": "Sussex County, NJ"
		},
		"34039": {
			"short": "Union",
			"long": "Union County, NJ"
		},
		"34041": {
			"short": "Warren",
			"long": "Warren County, NJ"
		},
		"35000": {
			"short": "NM",
			"long": "New Mexico"
		},
		"35001": {
			"short": "Bernalillo",
			"long": "Bernalillo County, NM"
		},
		"35003": {
			"short": "Catron",
			"long": "Catron County, NM"
		},
		"35005": {
			"short": "Chaves",
			"long": "Chaves County, NM"
		},
		"35006": {
			"short": "Cibola",
			"long": "Cibola County, NM"
		},
		"35007": {
			"short": "Colfax",
			"long": "Colfax County, NM"
		},
		"35009": {
			"short": "Curry",
			"long": "Curry County, NM"
		},
		"35011": {
			"short": "De Baca",
			"long": "De Baca County, NM"
		},
		"35013": {
			"short": "Dona Ana",
			"long": "Dona Ana County, NM"
		},
		"35015": {
			"short": "Eddy",
			"long": "Eddy County, NM"
		},
		"35017": {
			"short": "Grant",
			"long": "Grant County, NM"
		},
		"35019": {
			"short": "Guadalupe",
			"long": "Guadalupe County, NM"
		},
		"35021": {
			"short": "Harding",
			"long": "Harding County, NM"
		},
		"35023": {
			"short": "Hidalgo",
			"long": "Hidalgo County, NM"
		},
		"35025": {
			"short": "Lea",
			"long": "Lea County, NM"
		},
		"35027": {
			"short": "Lincoln",
			"long": "Lincoln County, NM"
		},
		"35028": {
			"short": "Los Alamos",
			"long": "Los Alamos County, NM"
		},
		"35029": {
			"short": "Luna",
			"long": "Luna County, NM"
		},
		"35031": {
			"short": "McKinley",
			"long": "McKinley County, NM"
		},
		"35033": {
			"short": "Mora",
			"long": "Mora County, NM"
		},
		"35035": {
			"short": "Otero",
			"long": "Otero County, NM"
		},
		"35037": {
			"short": "Quay",
			"long": "Quay County, NM"
		},
		"35039": {
			"short": "Rio Arriba",
			"long": "Rio Arriba County, NM"
		},
		"35041": {
			"short": "Roosevelt",
			"long": "Roosevelt County, NM"
		},
		"35043": {
			"short": "Sandoval",
			"long": "Sandoval County, NM"
		},
		"35045": {
			"short": "San Juan",
			"long": "San Juan County, NM"
		},
		"35047": {
			"short": "San Miguel",
			"long": "San Miguel County, NM"
		},
		"35049": {
			"short": "Santa Fe",
			"long": "Santa Fe County, NM"
		},
		"35051": {
			"short": "Sierra",
			"long": "Sierra County, NM"
		},
		"35053": {
			"short": "Socorro",
			"long": "Socorro County, NM"
		},
		"35055": {
			"short": "Taos",
			"long": "Taos County, NM"
		},
		"35057": {
			"short": "Torrance",
			"long": "Torrance County, NM"
		},
		"35059": {
			"short": "Union",
			"long": "Union County, NM"
		},
		"35061": {
			"short": "Valencia",
			"long": "Valencia County, NM"
		},
		"36000": {
			"short": "NY",
			"long": "New York"
		},
		"36001": {
			"short": "Albany",
			"long": "Albany County, NY"
		},
		"36003": {
			"short": "Allegany",
			"long": "Allegany County, NY"
		},
		"36005": {
			"short": "Bronx",
			"long": "Bronx County, NY"
		},
		"36007": {
			"short": "Broome",
			"long": "Broome County, NY"
		},
		"36009": {
			"short": "Cattaraugus",
			"long": "Cattaraugus County, NY"
		},
		"36011": {
			"short": "Cayuga",
			"long": "Cayuga County, NY"
		},
		"36013": {
			"short": "Chautauqua",
			"long": "Chautauqua County, NY"
		},
		"36015": {
			"short": "Chemung",
			"long": "Chemung County, NY"
		},
		"36017": {
			"short": "Chenango",
			"long": "Chenango County, NY"
		},
		"36019": {
			"short": "Clinton",
			"long": "Clinton County, NY"
		},
		"36021": {
			"short": "Columbia",
			"long": "Columbia County, NY"
		},
		"36023": {
			"short": "Cortland",
			"long": "Cortland County, NY"
		},
		"36025": {
			"short": "Delaware",
			"long": "Delaware County, NY"
		},
		"36027": {
			"short": "Dutchess",
			"long": "Dutchess County, NY"
		},
		"36029": {
			"short": "Erie",
			"long": "Erie County, NY"
		},
		"36031": {
			"short": "Essex",
			"long": "Essex County, NY"
		},
		"36033": {
			"short": "Franklin",
			"long": "Franklin County, NY"
		},
		"36035": {
			"short": "Fulton",
			"long": "Fulton County, NY"
		},
		"36037": {
			"short": "Genesee",
			"long": "Genesee County, NY"
		},
		"36039": {
			"short": "Greene",
			"long": "Greene County, NY"
		},
		"36041": {
			"short": "Hamilton",
			"long": "Hamilton County, NY"
		},
		"36043": {
			"short": "Herkimer",
			"long": "Herkimer County, NY"
		},
		"36045": {
			"short": "Jefferson",
			"long": "Jefferson County, NY"
		},
		"36047": {
			"short": "Kings",
			"long": "Kings County, NY"
		},
		"36049": {
			"short": "Lewis",
			"long": "Lewis County, NY"
		},
		"36051": {
			"short": "Livingston",
			"long": "Livingston County, NY"
		},
		"36053": {
			"short": "Madison",
			"long": "Madison County, NY"
		},
		"36055": {
			"short": "Monroe",
			"long": "Monroe County, NY"
		},
		"36057": {
			"short": "Montgomery",
			"long": "Montgomery County, NY"
		},
		"36059": {
			"short": "Nassau",
			"long": "Nassau County, NY"
		},
		"36061": {
			"short": "New York",
			"long": "New York County, NY"
		},
		"36063": {
			"short": "Niagara",
			"long": "Niagara County, NY"
		},
		"36065": {
			"short": "Oneida",
			"long": "Oneida County, NY"
		},
		"36067": {
			"short": "Onondaga",
			"long": "Onondaga County, NY"
		},
		"36069": {
			"short": "Ontario",
			"long": "Ontario County, NY"
		},
		"36071": {
			"short": "Orange",
			"long": "Orange County, NY"
		},
		"36073": {
			"short": "Orleans",
			"long": "Orleans County, NY"
		},
		"36075": {
			"short": "Oswego",
			"long": "Oswego County, NY"
		},
		"36077": {
			"short": "Otsego",
			"long": "Otsego County, NY"
		},
		"36079": {
			"short": "Putnam",
			"long": "Putnam County, NY"
		},
		"36081": {
			"short": "Queens",
			"long": "Queens County, NY"
		},
		"36083": {
			"short": "Rensselaer",
			"long": "Rensselaer County, NY"
		},
		"36085": {
			"short": "Richmond",
			"long": "Richmond County, NY"
		},
		"36087": {
			"short": "Rockland",
			"long": "Rockland County, NY"
		},
		"36089": {
			"short": "St. Lawrence",
			"long": "St. Lawrence County, NY"
		},
		"36091": {
			"short": "Saratoga",
			"long": "Saratoga County, NY"
		},
		"36093": {
			"short": "Schenectady",
			"long": "Schenectady County, NY"
		},
		"36095": {
			"short": "Schoharie",
			"long": "Schoharie County, NY"
		},
		"36097": {
			"short": "Schuyler",
			"long": "Schuyler County, NY"
		},
		"36099": {
			"short": "Seneca",
			"long": "Seneca County, NY"
		},
		"36101": {
			"short": "Steuben",
			"long": "Steuben County, NY"
		},
		"36103": {
			"short": "Suffolk",
			"long": "Suffolk County, NY"
		},
		"36105": {
			"short": "Sullivan",
			"long": "Sullivan County, NY"
		},
		"36107": {
			"short": "Tioga",
			"long": "Tioga County, NY"
		},
		"36109": {
			"short": "Tompkins",
			"long": "Tompkins County, NY"
		},
		"36111": {
			"short": "Ulster",
			"long": "Ulster County, NY"
		},
		"36113": {
			"short": "Warren",
			"long": "Warren County, NY"
		},
		"36115": {
			"short": "Washington",
			"long": "Washington County, NY"
		},
		"36117": {
			"short": "Wayne",
			"long": "Wayne County, NY"
		},
		"36119": {
			"short": "Westchester",
			"long": "Westchester County, NY"
		},
		"36121": {
			"short": "Wyoming",
			"long": "Wyoming County, NY"
		},
		"36123": {
			"short": "Yates",
			"long": "Yates County, NY"
		},
		"37000": {
			"short": "NC",
			"long": "North Carolina"
		},
		"37001": {
			"short": "Alamance",
			"long": "Alamance County, NC"
		},
		"37003": {
			"short": "Alexander",
			"long": "Alexander County, NC"
		},
		"37005": {
			"short": "Alleghany",
			"long": "Alleghany County, NC"
		},
		"37007": {
			"short": "Anson",
			"long": "Anson County, NC"
		},
		"37009": {
			"short": "Ashe",
			"long": "Ashe County, NC"
		},
		"37011": {
			"short": "Avery",
			"long": "Avery County, NC"
		},
		"37013": {
			"short": "Beaufort",
			"long": "Beaufort County, NC"
		},
		"37015": {
			"short": "Bertie",
			"long": "Bertie County, NC"
		},
		"37017": {
			"short": "Bladen",
			"long": "Bladen County, NC"
		},
		"37019": {
			"short": "Brunswick",
			"long": "Brunswick County, NC"
		},
		"37021": {
			"short": "Buncombe",
			"long": "Buncombe County, NC"
		},
		"37023": {
			"short": "Burke",
			"long": "Burke County, NC"
		},
		"37025": {
			"short": "Cabarrus",
			"long": "Cabarrus County, NC"
		},
		"37027": {
			"short": "Caldwell",
			"long": "Caldwell County, NC"
		},
		"37029": {
			"short": "Camden",
			"long": "Camden County, NC"
		},
		"37031": {
			"short": "Carteret",
			"long": "Carteret County, NC"
		},
		"37033": {
			"short": "Caswell",
			"long": "Caswell County, NC"
		},
		"37035": {
			"short": "Catawba",
			"long": "Catawba County, NC"
		},
		"37037": {
			"short": "Chatham",
			"long": "Chatham County, NC"
		},
		"37039": {
			"short": "Cherokee",
			"long": "Cherokee County, NC"
		},
		"37041": {
			"short": "Chowan",
			"long": "Chowan County, NC"
		},
		"37043": {
			"short": "Clay",
			"long": "Clay County, NC"
		},
		"37045": {
			"short": "Cleveland",
			"long": "Cleveland County, NC"
		},
		"37047": {
			"short": "Columbus",
			"long": "Columbus County, NC"
		},
		"37049": {
			"short": "Craven",
			"long": "Craven County, NC"
		},
		"37051": {
			"short": "Cumberland",
			"long": "Cumberland County, NC"
		},
		"37053": {
			"short": "Currituck",
			"long": "Currituck County, NC"
		},
		"37055": {
			"short": "Dare",
			"long": "Dare County, NC"
		},
		"37057": {
			"short": "Davidson",
			"long": "Davidson County, NC"
		},
		"37059": {
			"short": "Davie",
			"long": "Davie County, NC"
		},
		"37061": {
			"short": "Duplin",
			"long": "Duplin County, NC"
		},
		"37063": {
			"short": "Durham",
			"long": "Durham County, NC"
		},
		"37065": {
			"short": "Edgecombe",
			"long": "Edgecombe County, NC"
		},
		"37067": {
			"short": "Forsyth",
			"long": "Forsyth County, NC"
		},
		"37069": {
			"short": "Franklin",
			"long": "Franklin County, NC"
		},
		"37071": {
			"short": "Gaston",
			"long": "Gaston County, NC"
		},
		"37073": {
			"short": "Gates",
			"long": "Gates County, NC"
		},
		"37075": {
			"short": "Graham",
			"long": "Graham County, NC"
		},
		"37077": {
			"short": "Granville",
			"long": "Granville County, NC"
		},
		"37079": {
			"short": "Greene",
			"long": "Greene County, NC"
		},
		"37081": {
			"short": "Guilford",
			"long": "Guilford County, NC"
		},
		"37083": {
			"short": "Halifax",
			"long": "Halifax County, NC"
		},
		"37085": {
			"short": "Harnett",
			"long": "Harnett County, NC"
		},
		"37087": {
			"short": "Haywood",
			"long": "Haywood County, NC"
		},
		"37089": {
			"short": "Henderson",
			"long": "Henderson County, NC"
		},
		"37091": {
			"short": "Hertford",
			"long": "Hertford County, NC"
		},
		"37093": {
			"short": "Hoke",
			"long": "Hoke County, NC"
		},
		"37095": {
			"short": "Hyde",
			"long": "Hyde County, NC"
		},
		"37097": {
			"short": "Iredell",
			"long": "Iredell County, NC"
		},
		"37099": {
			"short": "Jackson",
			"long": "Jackson County, NC"
		},
		"37101": {
			"short": "Johnston",
			"long": "Johnston County, NC"
		},
		"37103": {
			"short": "Jones",
			"long": "Jones County, NC"
		},
		"37105": {
			"short": "Lee",
			"long": "Lee County, NC"
		},
		"37107": {
			"short": "Lenoir",
			"long": "Lenoir County, NC"
		},
		"37109": {
			"short": "Lincoln",
			"long": "Lincoln County, NC"
		},
		"37111": {
			"short": "McDowell",
			"long": "McDowell County, NC"
		},
		"37113": {
			"short": "Macon",
			"long": "Macon County, NC"
		},
		"37115": {
			"short": "Madison",
			"long": "Madison County, NC"
		},
		"37117": {
			"short": "Martin",
			"long": "Martin County, NC"
		},
		"37119": {
			"short": "Mecklenburg",
			"long": "Mecklenburg County, NC"
		},
		"37121": {
			"short": "Mitchell",
			"long": "Mitchell County, NC"
		},
		"37123": {
			"short": "Montgomery",
			"long": "Montgomery County, NC"
		},
		"37125": {
			"short": "Moore",
			"long": "Moore County, NC"
		},
		"37127": {
			"short": "Nash",
			"long": "Nash County, NC"
		},
		"37129": {
			"short": "New Hanover",
			"long": "New Hanover County, NC"
		},
		"37131": {
			"short": "Northampton",
			"long": "Northampton County, NC"
		},
		"37133": {
			"short": "Onslow",
			"long": "Onslow County, NC"
		},
		"37135": {
			"short": "Orange",
			"long": "Orange County, NC"
		},
		"37137": {
			"short": "Pamlico",
			"long": "Pamlico County, NC"
		},
		"37139": {
			"short": "Pasquotank",
			"long": "Pasquotank County, NC"
		},
		"37141": {
			"short": "Pender",
			"long": "Pender County, NC"
		},
		"37143": {
			"short": "Perquimans",
			"long": "Perquimans County, NC"
		},
		"37145": {
			"short": "Person",
			"long": "Person County, NC"
		},
		"37147": {
			"short": "Pitt",
			"long": "Pitt County, NC"
		},
		"37149": {
			"short": "Polk",
			"long": "Polk County, NC"
		},
		"37151": {
			"short": "Randolph",
			"long": "Randolph County, NC"
		},
		"37153": {
			"short": "Richmond",
			"long": "Richmond County, NC"
		},
		"37155": {
			"short": "Robeson",
			"long": "Robeson County, NC"
		},
		"37157": {
			"short": "Rockingham",
			"long": "Rockingham County, NC"
		},
		"37159": {
			"short": "Rowan",
			"long": "Rowan County, NC"
		},
		"37161": {
			"short": "Rutherford",
			"long": "Rutherford County, NC"
		},
		"37163": {
			"short": "Sampson",
			"long": "Sampson County, NC"
		},
		"37165": {
			"short": "Scotland",
			"long": "Scotland County, NC"
		},
		"37167": {
			"short": "Stanly",
			"long": "Stanly County, NC"
		},
		"37169": {
			"short": "Stokes",
			"long": "Stokes County, NC"
		},
		"37171": {
			"short": "Surry",
			"long": "Surry County, NC"
		},
		"37173": {
			"short": "Swain",
			"long": "Swain County, NC"
		},
		"37175": {
			"short": "Transylvania",
			"long": "Transylvania County, NC"
		},
		"37177": {
			"short": "Tyrrell",
			"long": "Tyrrell County, NC"
		},
		"37179": {
			"short": "Union",
			"long": "Union County, NC"
		},
		"37181": {
			"short": "Vance",
			"long": "Vance County, NC"
		},
		"37183": {
			"short": "Wake",
			"long": "Wake County, NC"
		},
		"37185": {
			"short": "Warren",
			"long": "Warren County, NC"
		},
		"37187": {
			"short": "Washington",
			"long": "Washington County, NC"
		},
		"37189": {
			"short": "Watauga",
			"long": "Watauga County, NC"
		},
		"37191": {
			"short": "Wayne",
			"long": "Wayne County, NC"
		},
		"37193": {
			"short": "Wilkes",
			"long": "Wilkes County, NC"
		},
		"37195": {
			"short": "Wilson",
			"long": "Wilson County, NC"
		},
		"37197": {
			"short": "Yadkin",
			"long": "Yadkin County, NC"
		},
		"37199": {
			"short": "Yancey",
			"long": "Yancey County, NC"
		},
		"38000": {
			"short": "ND",
			"long": "North Dakota"
		},
		"38001": {
			"short": "Adams",
			"long": "Adams County, ND"
		},
		"38003": {
			"short": "Barnes",
			"long": "Barnes County, ND"
		},
		"38005": {
			"short": "Benson",
			"long": "Benson County, ND"
		},
		"38007": {
			"short": "Billings",
			"long": "Billings County, ND"
		},
		"38009": {
			"short": "Bottineau",
			"long": "Bottineau County, ND"
		},
		"38011": {
			"short": "Bowman",
			"long": "Bowman County, ND"
		},
		"38013": {
			"short": "Burke",
			"long": "Burke County, ND"
		},
		"38015": {
			"short": "Burleigh",
			"long": "Burleigh County, ND"
		},
		"38017": {
			"short": "Cass",
			"long": "Cass County, ND"
		},
		"38019": {
			"short": "Cavalier",
			"long": "Cavalier County, ND"
		},
		"38021": {
			"short": "Dickey",
			"long": "Dickey County, ND"
		},
		"38023": {
			"short": "Divide",
			"long": "Divide County, ND"
		},
		"38025": {
			"short": "Dunn",
			"long": "Dunn County, ND"
		},
		"38027": {
			"short": "Eddy",
			"long": "Eddy County, ND"
		},
		"38029": {
			"short": "Emmons",
			"long": "Emmons County, ND"
		},
		"38031": {
			"short": "Foster",
			"long": "Foster County, ND"
		},
		"38033": {
			"short": "Golden Valley",
			"long": "Golden Valley County, ND"
		},
		"38035": {
			"short": "Grand Forks",
			"long": "Grand Forks County, ND"
		},
		"38037": {
			"short": "Grant",
			"long": "Grant County, ND"
		},
		"38039": {
			"short": "Griggs",
			"long": "Griggs County, ND"
		},
		"38041": {
			"short": "Hettinger",
			"long": "Hettinger County, ND"
		},
		"38043": {
			"short": "Kidder",
			"long": "Kidder County, ND"
		},
		"38045": {
			"short": "LaMoure",
			"long": "LaMoure County, ND"
		},
		"38047": {
			"short": "Logan",
			"long": "Logan County, ND"
		},
		"38049": {
			"short": "McHenry",
			"long": "McHenry County, ND"
		},
		"38051": {
			"short": "McIntosh",
			"long": "McIntosh County, ND"
		},
		"38053": {
			"short": "McKenzie",
			"long": "McKenzie County, ND"
		},
		"38055": {
			"short": "McLean",
			"long": "McLean County, ND"
		},
		"38057": {
			"short": "Mercer",
			"long": "Mercer County, ND"
		},
		"38059": {
			"short": "Morton",
			"long": "Morton County, ND"
		},
		"38061": {
			"short": "Mountrail",
			"long": "Mountrail County, ND"
		},
		"38063": {
			"short": "Nelson",
			"long": "Nelson County, ND"
		},
		"38065": {
			"short": "Oliver",
			"long": "Oliver County, ND"
		},
		"38067": {
			"short": "Pembina",
			"long": "Pembina County, ND"
		},
		"38069": {
			"short": "Pierce",
			"long": "Pierce County, ND"
		},
		"38071": {
			"short": "Ramsey",
			"long": "Ramsey County, ND"
		},
		"38073": {
			"short": "Ransom",
			"long": "Ransom County, ND"
		},
		"38075": {
			"short": "Renville",
			"long": "Renville County, ND"
		},
		"38077": {
			"short": "Richland",
			"long": "Richland County, ND"
		},
		"38079": {
			"short": "Rolette",
			"long": "Rolette County, ND"
		},
		"38081": {
			"short": "Sargent",
			"long": "Sargent County, ND"
		},
		"38083": {
			"short": "Sheridan",
			"long": "Sheridan County, ND"
		},
		"38085": {
			"short": "Sioux",
			"long": "Sioux County, ND"
		},
		"38087": {
			"short": "Slope",
			"long": "Slope County, ND"
		},
		"38089": {
			"short": "Stark",
			"long": "Stark County, ND"
		},
		"38091": {
			"short": "Steele",
			"long": "Steele County, ND"
		},
		"38093": {
			"short": "Stutsman",
			"long": "Stutsman County, ND"
		},
		"38095": {
			"short": "Towner",
			"long": "Towner County, ND"
		},
		"38097": {
			"short": "Traill",
			"long": "Traill County, ND"
		},
		"38099": {
			"short": "Walsh",
			"long": "Walsh County, ND"
		},
		"38101": {
			"short": "Ward",
			"long": "Ward County, ND"
		},
		"38103": {
			"short": "Wells",
			"long": "Wells County, ND"
		},
		"38105": {
			"short": "Williams",
			"long": "Williams County, ND"
		},
		"39000": {
			"short": "OH",
			"long": "Ohio"
		},
		"39001": {
			"short": "Adams",
			"long": "Adams County, OH"
		},
		"39003": {
			"short": "Allen",
			"long": "Allen County, OH"
		},
		"39005": {
			"short": "Ashland",
			"long": "Ashland County, OH"
		},
		"39007": {
			"short": "Ashtabula",
			"long": "Ashtabula County, OH"
		},
		"39009": {
			"short": "Athens",
			"long": "Athens County, OH"
		},
		"39011": {
			"short": "Auglaize",
			"long": "Auglaize County, OH"
		},
		"39013": {
			"short": "Belmont",
			"long": "Belmont County, OH"
		},
		"39015": {
			"short": "Brown",
			"long": "Brown County, OH"
		},
		"39017": {
			"short": "Butler",
			"long": "Butler County, OH"
		},
		"39019": {
			"short": "Carroll",
			"long": "Carroll County, OH"
		},
		"39021": {
			"short": "Champaign",
			"long": "Champaign County, OH"
		},
		"39023": {
			"short": "Clark",
			"long": "Clark County, OH"
		},
		"39025": {
			"short": "Clermont",
			"long": "Clermont County, OH"
		},
		"39027": {
			"short": "Clinton",
			"long": "Clinton County, OH"
		},
		"39029": {
			"short": "Columbiana",
			"long": "Columbiana County, OH"
		},
		"39031": {
			"short": "Coshocton",
			"long": "Coshocton County, OH"
		},
		"39033": {
			"short": "Crawford",
			"long": "Crawford County, OH"
		},
		"39035": {
			"short": "Cuyahoga",
			"long": "Cuyahoga County, OH"
		},
		"39037": {
			"short": "Darke",
			"long": "Darke County, OH"
		},
		"39039": {
			"short": "Defiance",
			"long": "Defiance County, OH"
		},
		"39041": {
			"short": "Delaware",
			"long": "Delaware County, OH"
		},
		"39043": {
			"short": "Erie",
			"long": "Erie County, OH"
		},
		"39045": {
			"short": "Fairfield",
			"long": "Fairfield County, OH"
		},
		"39047": {
			"short": "Fayette",
			"long": "Fayette County, OH"
		},
		"39049": {
			"short": "Franklin",
			"long": "Franklin County, OH"
		},
		"39051": {
			"short": "Fulton",
			"long": "Fulton County, OH"
		},
		"39053": {
			"short": "Gallia",
			"long": "Gallia County, OH"
		},
		"39055": {
			"short": "Geauga",
			"long": "Geauga County, OH"
		},
		"39057": {
			"short": "Greene",
			"long": "Greene County, OH"
		},
		"39059": {
			"short": "Guernsey",
			"long": "Guernsey County, OH"
		},
		"39061": {
			"short": "Hamilton",
			"long": "Hamilton County, OH"
		},
		"39063": {
			"short": "Hancock",
			"long": "Hancock County, OH"
		},
		"39065": {
			"short": "Hardin",
			"long": "Hardin County, OH"
		},
		"39067": {
			"short": "Harrison",
			"long": "Harrison County, OH"
		},
		"39069": {
			"short": "Henry",
			"long": "Henry County, OH"
		},
		"39071": {
			"short": "Highland",
			"long": "Highland County, OH"
		},
		"39073": {
			"short": "Hocking",
			"long": "Hocking County, OH"
		},
		"39075": {
			"short": "Holmes",
			"long": "Holmes County, OH"
		},
		"39077": {
			"short": "Huron",
			"long": "Huron County, OH"
		},
		"39079": {
			"short": "Jackson",
			"long": "Jackson County, OH"
		},
		"39081": {
			"short": "Jefferson",
			"long": "Jefferson County, OH"
		},
		"39083": {
			"short": "Knox",
			"long": "Knox County, OH"
		},
		"39085": {
			"short": "Lake",
			"long": "Lake County, OH"
		},
		"39087": {
			"short": "Lawrence",
			"long": "Lawrence County, OH"
		},
		"39089": {
			"short": "Licking",
			"long": "Licking County, OH"
		},
		"39091": {
			"short": "Logan",
			"long": "Logan County, OH"
		},
		"39093": {
			"short": "Lorain",
			"long": "Lorain County, OH"
		},
		"39095": {
			"short": "Lucas",
			"long": "Lucas County, OH"
		},
		"39097": {
			"short": "Madison",
			"long": "Madison County, OH"
		},
		"39099": {
			"short": "Mahoning",
			"long": "Mahoning County, OH"
		},
		"39101": {
			"short": "Marion",
			"long": "Marion County, OH"
		},
		"39103": {
			"short": "Medina",
			"long": "Medina County, OH"
		},
		"39105": {
			"short": "Meigs",
			"long": "Meigs County, OH"
		},
		"39107": {
			"short": "Mercer",
			"long": "Mercer County, OH"
		},
		"39109": {
			"short": "Miami",
			"long": "Miami County, OH"
		},
		"39111": {
			"short": "Monroe",
			"long": "Monroe County, OH"
		},
		"39113": {
			"short": "Montgomery",
			"long": "Montgomery County, OH"
		},
		"39115": {
			"short": "Morgan",
			"long": "Morgan County, OH"
		},
		"39117": {
			"short": "Morrow",
			"long": "Morrow County, OH"
		},
		"39119": {
			"short": "Muskingum",
			"long": "Muskingum County, OH"
		},
		"39121": {
			"short": "Noble",
			"long": "Noble County, OH"
		},
		"39123": {
			"short": "Ottawa",
			"long": "Ottawa County, OH"
		},
		"39125": {
			"short": "Paulding",
			"long": "Paulding County, OH"
		},
		"39127": {
			"short": "Perry",
			"long": "Perry County, OH"
		},
		"39129": {
			"short": "Pickaway",
			"long": "Pickaway County, OH"
		},
		"39131": {
			"short": "Pike",
			"long": "Pike County, OH"
		},
		"39133": {
			"short": "Portage",
			"long": "Portage County, OH"
		},
		"39135": {
			"short": "Preble",
			"long": "Preble County, OH"
		},
		"39137": {
			"short": "Putnam",
			"long": "Putnam County, OH"
		},
		"39139": {
			"short": "Richland",
			"long": "Richland County, OH"
		},
		"39141": {
			"short": "Ross",
			"long": "Ross County, OH"
		},
		"39143": {
			"short": "Sandusky",
			"long": "Sandusky County, OH"
		},
		"39145": {
			"short": "Scioto",
			"long": "Scioto County, OH"
		},
		"39147": {
			"short": "Seneca",
			"long": "Seneca County, OH"
		},
		"39149": {
			"short": "Shelby",
			"long": "Shelby County, OH"
		},
		"39151": {
			"short": "Stark",
			"long": "Stark County, OH"
		},
		"39153": {
			"short": "Summit",
			"long": "Summit County, OH"
		},
		"39155": {
			"short": "Trumbull",
			"long": "Trumbull County, OH"
		},
		"39157": {
			"short": "Tuscarawas",
			"long": "Tuscarawas County, OH"
		},
		"39159": {
			"short": "Union",
			"long": "Union County, OH"
		},
		"39161": {
			"short": "Van Wert",
			"long": "Van Wert County, OH"
		},
		"39163": {
			"short": "Vinton",
			"long": "Vinton County, OH"
		},
		"39165": {
			"short": "Warren",
			"long": "Warren County, OH"
		},
		"39167": {
			"short": "Washington",
			"long": "Washington County, OH"
		},
		"39169": {
			"short": "Wayne",
			"long": "Wayne County, OH"
		},
		"39171": {
			"short": "Williams",
			"long": "Williams County, OH"
		},
		"39173": {
			"short": "Wood",
			"long": "Wood County, OH"
		},
		"39175": {
			"short": "Wyandot",
			"long": "Wyandot County, OH"
		},
		"40000": {
			"short": "OK",
			"long": "Oklahoma"
		},
		"40001": {
			"short": "Adair",
			"long": "Adair County, OK"
		},
		"40003": {
			"short": "Alfalfa",
			"long": "Alfalfa County, OK"
		},
		"40005": {
			"short": "Atoka",
			"long": "Atoka County, OK"
		},
		"40007": {
			"short": "Beaver",
			"long": "Beaver County, OK"
		},
		"40009": {
			"short": "Beckham",
			"long": "Beckham County, OK"
		},
		"40011": {
			"short": "Blaine",
			"long": "Blaine County, OK"
		},
		"40013": {
			"short": "Bryan",
			"long": "Bryan County, OK"
		},
		"40015": {
			"short": "Caddo",
			"long": "Caddo County, OK"
		},
		"40017": {
			"short": "Canadian",
			"long": "Canadian County, OK"
		},
		"40019": {
			"short": "Carter",
			"long": "Carter County, OK"
		},
		"40021": {
			"short": "Cherokee",
			"long": "Cherokee County, OK"
		},
		"40023": {
			"short": "Choctaw",
			"long": "Choctaw County, OK"
		},
		"40025": {
			"short": "Cimarron",
			"long": "Cimarron County, OK"
		},
		"40027": {
			"short": "Cleveland",
			"long": "Cleveland County, OK"
		},
		"40029": {
			"short": "Coal",
			"long": "Coal County, OK"
		},
		"40031": {
			"short": "Comanche",
			"long": "Comanche County, OK"
		},
		"40033": {
			"short": "Cotton",
			"long": "Cotton County, OK"
		},
		"40035": {
			"short": "Craig",
			"long": "Craig County, OK"
		},
		"40037": {
			"short": "Creek",
			"long": "Creek County, OK"
		},
		"40039": {
			"short": "Custer",
			"long": "Custer County, OK"
		},
		"40041": {
			"short": "Delaware",
			"long": "Delaware County, OK"
		},
		"40043": {
			"short": "Dewey",
			"long": "Dewey County, OK"
		},
		"40045": {
			"short": "Ellis",
			"long": "Ellis County, OK"
		},
		"40047": {
			"short": "Garfield",
			"long": "Garfield County, OK"
		},
		"40049": {
			"short": "Garvin",
			"long": "Garvin County, OK"
		},
		"40051": {
			"short": "Grady",
			"long": "Grady County, OK"
		},
		"40053": {
			"short": "Grant",
			"long": "Grant County, OK"
		},
		"40055": {
			"short": "Greer",
			"long": "Greer County, OK"
		},
		"40057": {
			"short": "Harmon",
			"long": "Harmon County, OK"
		},
		"40059": {
			"short": "Harper",
			"long": "Harper County, OK"
		},
		"40061": {
			"short": "Haskell",
			"long": "Haskell County, OK"
		},
		"40063": {
			"short": "Hughes",
			"long": "Hughes County, OK"
		},
		"40065": {
			"short": "Jackson",
			"long": "Jackson County, OK"
		},
		"40067": {
			"short": "Jefferson",
			"long": "Jefferson County, OK"
		},
		"40069": {
			"short": "Johnston",
			"long": "Johnston County, OK"
		},
		"40071": {
			"short": "Kay",
			"long": "Kay County, OK"
		},
		"40073": {
			"short": "Kingfisher",
			"long": "Kingfisher County, OK"
		},
		"40075": {
			"short": "Kiowa",
			"long": "Kiowa County, OK"
		},
		"40077": {
			"short": "Latimer",
			"long": "Latimer County, OK"
		},
		"40079": {
			"short": "Le Flore",
			"long": "Le Flore County, OK"
		},
		"40081": {
			"short": "Lincoln",
			"long": "Lincoln County, OK"
		},
		"40083": {
			"short": "Logan",
			"long": "Logan County, OK"
		},
		"40085": {
			"short": "Love",
			"long": "Love County, OK"
		},
		"40087": {
			"short": "McClain",
			"long": "McClain County, OK"
		},
		"40089": {
			"short": "McCurtain",
			"long": "McCurtain County, OK"
		},
		"40091": {
			"short": "McIntosh",
			"long": "McIntosh County, OK"
		},
		"40093": {
			"short": "Major",
			"long": "Major County, OK"
		},
		"40095": {
			"short": "Marshall",
			"long": "Marshall County, OK"
		},
		"40097": {
			"short": "Mayes",
			"long": "Mayes County, OK"
		},
		"40099": {
			"short": "Murray",
			"long": "Murray County, OK"
		},
		"40101": {
			"short": "Muskogee",
			"long": "Muskogee County, OK"
		},
		"40103": {
			"short": "Noble",
			"long": "Noble County, OK"
		},
		"40105": {
			"short": "Nowata",
			"long": "Nowata County, OK"
		},
		"40107": {
			"short": "Okfuskee",
			"long": "Okfuskee County, OK"
		},
		"40109": {
			"short": "Oklahoma",
			"long": "Oklahoma County, OK"
		},
		"40111": {
			"short": "Okmulgee",
			"long": "Okmulgee County, OK"
		},
		"40113": {
			"short": "Osage",
			"long": "Osage County, OK"
		},
		"40115": {
			"short": "Ottawa",
			"long": "Ottawa County, OK"
		},
		"40117": {
			"short": "Pawnee",
			"long": "Pawnee County, OK"
		},
		"40119": {
			"short": "Payne",
			"long": "Payne County, OK"
		},
		"40121": {
			"short": "Pittsburg",
			"long": "Pittsburg County, OK"
		},
		"40123": {
			"short": "Pontotoc",
			"long": "Pontotoc County, OK"
		},
		"40125": {
			"short": "Pottawatomie",
			"long": "Pottawatomie County, OK"
		},
		"40127": {
			"short": "Pushmataha",
			"long": "Pushmataha County, OK"
		},
		"40129": {
			"short": "Roger Mills",
			"long": "Roger Mills County, OK"
		},
		"40131": {
			"short": "Rogers",
			"long": "Rogers County, OK"
		},
		"40133": {
			"short": "Seminole",
			"long": "Seminole County, OK"
		},
		"40135": {
			"short": "Sequoyah",
			"long": "Sequoyah County, OK"
		},
		"40137": {
			"short": "Stephens",
			"long": "Stephens County, OK"
		},
		"40139": {
			"short": "Texas",
			"long": "Texas County, OK"
		},
		"40141": {
			"short": "Tillman",
			"long": "Tillman County, OK"
		},
		"40143": {
			"short": "Tulsa",
			"long": "Tulsa County, OK"
		},
		"40145": {
			"short": "Wagoner",
			"long": "Wagoner County, OK"
		},
		"40147": {
			"short": "Washington",
			"long": "Washington County, OK"
		},
		"40149": {
			"short": "Washita",
			"long": "Washita County, OK"
		},
		"40151": {
			"short": "Woods",
			"long": "Woods County, OK"
		},
		"40153": {
			"short": "Woodward",
			"long": "Woodward County, OK"
		},
		"41000": {
			"short": "OR",
			"long": "Oregon"
		},
		"41001": {
			"short": "Baker",
			"long": "Baker County, OR"
		},
		"41003": {
			"short": "Benton",
			"long": "Benton County, OR"
		},
		"41005": {
			"short": "Clackamas",
			"long": "Clackamas County, OR"
		},
		"41007": {
			"short": "Clatsop",
			"long": "Clatsop County, OR"
		},
		"41009": {
			"short": "Columbia",
			"long": "Columbia County, OR"
		},
		"41011": {
			"short": "Coos",
			"long": "Coos County, OR"
		},
		"41013": {
			"short": "Crook",
			"long": "Crook County, OR"
		},
		"41015": {
			"short": "Curry",
			"long": "Curry County, OR"
		},
		"41017": {
			"short": "Deschutes",
			"long": "Deschutes County, OR"
		},
		"41019": {
			"short": "Douglas",
			"long": "Douglas County, OR"
		},
		"41021": {
			"short": "Gilliam",
			"long": "Gilliam County, OR"
		},
		"41023": {
			"short": "Grant",
			"long": "Grant County, OR"
		},
		"41025": {
			"short": "Harney",
			"long": "Harney County, OR"
		},
		"41027": {
			"short": "Hood River",
			"long": "Hood River County, OR"
		},
		"41029": {
			"short": "Jackson",
			"long": "Jackson County, OR"
		},
		"41031": {
			"short": "Jefferson",
			"long": "Jefferson County, OR"
		},
		"41033": {
			"short": "Josephine",
			"long": "Josephine County, OR"
		},
		"41035": {
			"short": "Klamath",
			"long": "Klamath County, OR"
		},
		"41037": {
			"short": "Lake",
			"long": "Lake County, OR"
		},
		"41039": {
			"short": "Lane",
			"long": "Lane County, OR"
		},
		"41041": {
			"short": "Lincoln",
			"long": "Lincoln County, OR"
		},
		"41043": {
			"short": "Linn",
			"long": "Linn County, OR"
		},
		"41045": {
			"short": "Malheur",
			"long": "Malheur County, OR"
		},
		"41047": {
			"short": "Marion",
			"long": "Marion County, OR"
		},
		"41049": {
			"short": "Morrow",
			"long": "Morrow County, OR"
		},
		"41051": {
			"short": "Multnomah",
			"long": "Multnomah County, OR"
		},
		"41053": {
			"short": "Polk",
			"long": "Polk County, OR"
		},
		"41055": {
			"short": "Sherman",
			"long": "Sherman County, OR"
		},
		"41057": {
			"short": "Tillamook",
			"long": "Tillamook County, OR"
		},
		"41059": {
			"short": "Umatilla",
			"long": "Umatilla County, OR"
		},
		"41061": {
			"short": "Union",
			"long": "Union County, OR"
		},
		"41063": {
			"short": "Wallowa",
			"long": "Wallowa County, OR"
		},
		"41065": {
			"short": "Wasco",
			"long": "Wasco County, OR"
		},
		"41067": {
			"short": "Washington",
			"long": "Washington County, OR"
		},
		"41069": {
			"short": "Wheeler",
			"long": "Wheeler County, OR"
		},
		"41071": {
			"short": "Yamhill",
			"long": "Yamhill County, OR"
		},
		"42000": {
			"short": "PA",
			"long": "Pennsylvania"
		},
		"42001": {
			"short": "Adams",
			"long": "Adams County, PA"
		},
		"42003": {
			"short": "Allegheny",
			"long": "Allegheny County, PA"
		},
		"42005": {
			"short": "Armstrong",
			"long": "Armstrong County, PA"
		},
		"42007": {
			"short": "Beaver",
			"long": "Beaver County, PA"
		},
		"42009": {
			"short": "Bedford",
			"long": "Bedford County, PA"
		},
		"42011": {
			"short": "Berks",
			"long": "Berks County, PA"
		},
		"42013": {
			"short": "Blair",
			"long": "Blair County, PA"
		},
		"42015": {
			"short": "Bradford",
			"long": "Bradford County, PA"
		},
		"42017": {
			"short": "Bucks",
			"long": "Bucks County, PA"
		},
		"42019": {
			"short": "Butler",
			"long": "Butler County, PA"
		},
		"42021": {
			"short": "Cambria",
			"long": "Cambria County, PA"
		},
		"42023": {
			"short": "Cameron",
			"long": "Cameron County, PA"
		},
		"42025": {
			"short": "Carbon",
			"long": "Carbon County, PA"
		},
		"42027": {
			"short": "Centre",
			"long": "Centre County, PA"
		},
		"42029": {
			"short": "Chester",
			"long": "Chester County, PA"
		},
		"42031": {
			"short": "Clarion",
			"long": "Clarion County, PA"
		},
		"42033": {
			"short": "Clearfield",
			"long": "Clearfield County, PA"
		},
		"42035": {
			"short": "Clinton",
			"long": "Clinton County, PA"
		},
		"42037": {
			"short": "Columbia",
			"long": "Columbia County, PA"
		},
		"42039": {
			"short": "Crawford",
			"long": "Crawford County, PA"
		},
		"42041": {
			"short": "Cumberland",
			"long": "Cumberland County, PA"
		},
		"42043": {
			"short": "Dauphin",
			"long": "Dauphin County, PA"
		},
		"42045": {
			"short": "Delaware",
			"long": "Delaware County, PA"
		},
		"42047": {
			"short": "Elk",
			"long": "Elk County, PA"
		},
		"42049": {
			"short": "Erie",
			"long": "Erie County, PA"
		},
		"42051": {
			"short": "Fayette",
			"long": "Fayette County, PA"
		},
		"42053": {
			"short": "Forest",
			"long": "Forest County, PA"
		},
		"42055": {
			"short": "Franklin",
			"long": "Franklin County, PA"
		},
		"42057": {
			"short": "Fulton",
			"long": "Fulton County, PA"
		},
		"42059": {
			"short": "Greene",
			"long": "Greene County, PA"
		},
		"42061": {
			"short": "Huntingdon",
			"long": "Huntingdon County, PA"
		},
		"42063": {
			"short": "Indiana",
			"long": "Indiana County, PA"
		},
		"42065": {
			"short": "Jefferson",
			"long": "Jefferson County, PA"
		},
		"42067": {
			"short": "Juniata",
			"long": "Juniata County, PA"
		},
		"42069": {
			"short": "Lackawanna",
			"long": "Lackawanna County, PA"
		},
		"42071": {
			"short": "Lancaster",
			"long": "Lancaster County, PA"
		},
		"42073": {
			"short": "Lawrence",
			"long": "Lawrence County, PA"
		},
		"42075": {
			"short": "Lebanon",
			"long": "Lebanon County, PA"
		},
		"42077": {
			"short": "Lehigh",
			"long": "Lehigh County, PA"
		},
		"42079": {
			"short": "Luzerne",
			"long": "Luzerne County, PA"
		},
		"42081": {
			"short": "Lycoming",
			"long": "Lycoming County, PA"
		},
		"42083": {
			"short": "McKean",
			"long": "McKean County, PA"
		},
		"42085": {
			"short": "Mercer",
			"long": "Mercer County, PA"
		},
		"42087": {
			"short": "Mifflin",
			"long": "Mifflin County, PA"
		},
		"42089": {
			"short": "Monroe",
			"long": "Monroe County, PA"
		},
		"42091": {
			"short": "Montgomery",
			"long": "Montgomery County, PA"
		},
		"42093": {
			"short": "Montour",
			"long": "Montour County, PA"
		},
		"42095": {
			"short": "Northampton",
			"long": "Northampton County, PA"
		},
		"42097": {
			"short": "Northumberland",
			"long": "Northumberland County, PA"
		},
		"42099": {
			"short": "Perry",
			"long": "Perry County, PA"
		},
		"42101": {
			"short": "Philadelphia",
			"long": "Philadelphia County, PA"
		},
		"42103": {
			"short": "Pike",
			"long": "Pike County, PA"
		},
		"42105": {
			"short": "Potter",
			"long": "Potter County, PA"
		},
		"42107": {
			"short": "Schuylkill",
			"long": "Schuylkill County, PA"
		},
		"42109": {
			"short": "Snyder",
			"long": "Snyder County, PA"
		},
		"42111": {
			"short": "Somerset",
			"long": "Somerset County, PA"
		},
		"42113": {
			"short": "Sullivan",
			"long": "Sullivan County, PA"
		},
		"42115": {
			"short": "Susquehanna",
			"long": "Susquehanna County, PA"
		},
		"42117": {
			"short": "Tioga",
			"long": "Tioga County, PA"
		},
		"42119": {
			"short": "Union",
			"long": "Union County, PA"
		},
		"42121": {
			"short": "Venango",
			"long": "Venango County, PA"
		},
		"42123": {
			"short": "Warren",
			"long": "Warren County, PA"
		},
		"42125": {
			"short": "Washington",
			"long": "Washington County, PA"
		},
		"42127": {
			"short": "Wayne",
			"long": "Wayne County, PA"
		},
		"42129": {
			"short": "Westmoreland",
			"long": "Westmoreland County, PA"
		},
		"42131": {
			"short": "Wyoming",
			"long": "Wyoming County, PA"
		},
		"42133": {
			"short": "York",
			"long": "York County, PA"
		},
		"44000": {
			"short": "RI",
			"long": "Rhode Island"
		},
		"44001": {
			"short": "Bristol",
			"long": "Bristol County, RI"
		},
		"44003": {
			"short": "Kent",
			"long": "Kent County, RI"
		},
		"44005": {
			"short": "Newport",
			"long": "Newport County, RI"
		},
		"44007": {
			"short": "Providence",
			"long": "Providence County, RI"
		},
		"44009": {
			"short": "Washington",
			"long": "Washington County, RI"
		},
		"45000": {
			"short": "SC",
			"long": "South Carolina"
		},
		"45001": {
			"short": "Abbeville",
			"long": "Abbeville County, SC"
		},
		"45003": {
			"short": "Aiken",
			"long": "Aiken County, SC"
		},
		"45005": {
			"short": "Allendale",
			"long": "Allendale County, SC"
		},
		"45007": {
			"short": "Anderson",
			"long": "Anderson County, SC"
		},
		"45009": {
			"short": "Bamberg",
			"long": "Bamberg County, SC"
		},
		"45011": {
			"short": "Barnwell",
			"long": "Barnwell County, SC"
		},
		"45013": {
			"short": "Beaufort",
			"long": "Beaufort County, SC"
		},
		"45015": {
			"short": "Berkeley",
			"long": "Berkeley County, SC"
		},
		"45017": {
			"short": "Calhoun",
			"long": "Calhoun County, SC"
		},
		"45019": {
			"short": "Charleston",
			"long": "Charleston County, SC"
		},
		"45021": {
			"short": "Cherokee",
			"long": "Cherokee County, SC"
		},
		"45023": {
			"short": "Chester",
			"long": "Chester County, SC"
		},
		"45025": {
			"short": "Chesterfield",
			"long": "Chesterfield County, SC"
		},
		"45027": {
			"short": "Clarendon",
			"long": "Clarendon County, SC"
		},
		"45029": {
			"short": "Colleton",
			"long": "Colleton County, SC"
		},
		"45031": {
			"short": "Darlington",
			"long": "Darlington County, SC"
		},
		"45033": {
			"short": "Dillon",
			"long": "Dillon County, SC"
		},
		"45035": {
			"short": "Dorchester",
			"long": "Dorchester County, SC"
		},
		"45037": {
			"short": "Edgefield",
			"long": "Edgefield County, SC"
		},
		"45039": {
			"short": "Fairfield",
			"long": "Fairfield County, SC"
		},
		"45041": {
			"short": "Florence",
			"long": "Florence County, SC"
		},
		"45043": {
			"short": "Georgetown",
			"long": "Georgetown County, SC"
		},
		"45045": {
			"short": "Greenville",
			"long": "Greenville County, SC"
		},
		"45047": {
			"short": "Greenwood",
			"long": "Greenwood County, SC"
		},
		"45049": {
			"short": "Hampton",
			"long": "Hampton County, SC"
		},
		"45051": {
			"short": "Horry",
			"long": "Horry County, SC"
		},
		"45053": {
			"short": "Jasper",
			"long": "Jasper County, SC"
		},
		"45055": {
			"short": "Kershaw",
			"long": "Kershaw County, SC"
		},
		"45057": {
			"short": "Lancaster",
			"long": "Lancaster County, SC"
		},
		"45059": {
			"short": "Laurens",
			"long": "Laurens County, SC"
		},
		"45061": {
			"short": "Lee",
			"long": "Lee County, SC"
		},
		"45063": {
			"short": "Lexington",
			"long": "Lexington County, SC"
		},
		"45065": {
			"short": "McCormick",
			"long": "McCormick County, SC"
		},
		"45067": {
			"short": "Marion",
			"long": "Marion County, SC"
		},
		"45069": {
			"short": "Marlboro",
			"long": "Marlboro County, SC"
		},
		"45071": {
			"short": "Newberry",
			"long": "Newberry County, SC"
		},
		"45073": {
			"short": "Oconee",
			"long": "Oconee County, SC"
		},
		"45075": {
			"short": "Orangeburg",
			"long": "Orangeburg County, SC"
		},
		"45077": {
			"short": "Pickens",
			"long": "Pickens County, SC"
		},
		"45079": {
			"short": "Richland",
			"long": "Richland County, SC"
		},
		"45081": {
			"short": "Saluda",
			"long": "Saluda County, SC"
		},
		"45083": {
			"short": "Spartanburg",
			"long": "Spartanburg County, SC"
		},
		"45085": {
			"short": "Sumter",
			"long": "Sumter County, SC"
		},
		"45087": {
			"short": "Union",
			"long": "Union County, SC"
		},
		"45089": {
			"short": "Williamsburg",
			"long": "Williamsburg County, SC"
		},
		"45091": {
			"short": "York",
			"long": "York County, SC"
		},
		"46000": {
			"short": "SD",
			"long": "South Dakota"
		},
		"46003": {
			"short": "Aurora",
			"long": "Aurora County, SD"
		},
		"46005": {
			"short": "Beadle",
			"long": "Beadle County, SD"
		},
		"46007": {
			"short": "Bennett",
			"long": "Bennett County, SD"
		},
		"46009": {
			"short": "Bon Homme",
			"long": "Bon Homme County, SD"
		},
		"46011": {
			"short": "Brookings",
			"long": "Brookings County, SD"
		},
		"46013": {
			"short": "Brown",
			"long": "Brown County, SD"
		},
		"46015": {
			"short": "Brule",
			"long": "Brule County, SD"
		},
		"46017": {
			"short": "Buffalo",
			"long": "Buffalo County, SD"
		},
		"46019": {
			"short": "Butte",
			"long": "Butte County, SD"
		},
		"46021": {
			"short": "Campbell",
			"long": "Campbell County, SD"
		},
		"46023": {
			"short": "Charles Mix",
			"long": "Charles Mix County, SD"
		},
		"46025": {
			"short": "Clark",
			"long": "Clark County, SD"
		},
		"46027": {
			"short": "Clay",
			"long": "Clay County, SD"
		},
		"46029": {
			"short": "Codington",
			"long": "Codington County, SD"
		},
		"46031": {
			"short": "Corson",
			"long": "Corson County, SD"
		},
		"46033": {
			"short": "Custer",
			"long": "Custer County, SD"
		},
		"46035": {
			"short": "Davison",
			"long": "Davison County, SD"
		},
		"46037": {
			"short": "Day",
			"long": "Day County, SD"
		},
		"46039": {
			"short": "Deuel",
			"long": "Deuel County, SD"
		},
		"46041": {
			"short": "Dewey",
			"long": "Dewey County, SD"
		},
		"46043": {
			"short": "Douglas",
			"long": "Douglas County, SD"
		},
		"46045": {
			"short": "Edmunds",
			"long": "Edmunds County, SD"
		},
		"46047": {
			"short": "Fall River",
			"long": "Fall River County, SD"
		},
		"46049": {
			"short": "Faulk",
			"long": "Faulk County, SD"
		},
		"46051": {
			"short": "Grant",
			"long": "Grant County, SD"
		},
		"46053": {
			"short": "Gregory",
			"long": "Gregory County, SD"
		},
		"46055": {
			"short": "Haakon",
			"long": "Haakon County, SD"
		},
		"46057": {
			"short": "Hamlin",
			"long": "Hamlin County, SD"
		},
		"46059": {
			"short": "Hand",
			"long": "Hand County, SD"
		},
		"46061": {
			"short": "Hanson",
			"long": "Hanson County, SD"
		},
		"46063": {
			"short": "Harding",
			"long": "Harding County, SD"
		},
		"46065": {
			"short": "Hughes",
			"long": "Hughes County, SD"
		},
		"46067": {
			"short": "Hutchinson",
			"long": "Hutchinson County, SD"
		},
		"46069": {
			"short": "Hyde",
			"long": "Hyde County, SD"
		},
		"46071": {
			"short": "Jackson",
			"long": "Jackson County, SD"
		},
		"46073": {
			"short": "Jerauld",
			"long": "Jerauld County, SD"
		},
		"46075": {
			"short": "Jones",
			"long": "Jones County, SD"
		},
		"46077": {
			"short": "Kingsbury",
			"long": "Kingsbury County, SD"
		},
		"46079": {
			"short": "Lake",
			"long": "Lake County, SD"
		},
		"46081": {
			"short": "Lawrence",
			"long": "Lawrence County, SD"
		},
		"46083": {
			"short": "Lincoln",
			"long": "Lincoln County, SD"
		},
		"46085": {
			"short": "Lyman",
			"long": "Lyman County, SD"
		},
		"46087": {
			"short": "McCook",
			"long": "McCook County, SD"
		},
		"46089": {
			"short": "McPherson",
			"long": "McPherson County, SD"
		},
		"46091": {
			"short": "Marshall",
			"long": "Marshall County, SD"
		},
		"46093": {
			"short": "Meade",
			"long": "Meade County, SD"
		},
		"46095": {
			"short": "Mellette",
			"long": "Mellette County, SD"
		},
		"46097": {
			"short": "Miner",
			"long": "Miner County, SD"
		},
		"46099": {
			"short": "Minnehaha",
			"long": "Minnehaha County, SD"
		},
		"46101": {
			"short": "Moody",
			"long": "Moody County, SD"
		},
		"46103": {
			"short": "Pennington",
			"long": "Pennington County, SD"
		},
		"46105": {
			"short": "Perkins",
			"long": "Perkins County, SD"
		},
		"46107": {
			"short": "Potter",
			"long": "Potter County, SD"
		},
		"46109": {
			"short": "Roberts",
			"long": "Roberts County, SD"
		},
		"46111": {
			"short": "Sanborn",
			"long": "Sanborn County, SD"
		},
		"46113": {
			"short": "Shannon",
			"long": "Shannon County, SD"
		},
		"46115": {
			"short": "Spink",
			"long": "Spink County, SD"
		},
		"46117": {
			"short": "Stanley",
			"long": "Stanley County, SD"
		},
		"46119": {
			"short": "Sully",
			"long": "Sully County, SD"
		},
		"46121": {
			"short": "Todd",
			"long": "Todd County, SD"
		},
		"46123": {
			"short": "Tripp",
			"long": "Tripp County, SD"
		},
		"46125": {
			"short": "Turner",
			"long": "Turner County, SD"
		},
		"46127": {
			"short": "Union",
			"long": "Union County, SD"
		},
		"46129": {
			"short": "Walworth",
			"long": "Walworth County, SD"
		},
		"46135": {
			"short": "Yankton",
			"long": "Yankton County, SD"
		},
		"46137": {
			"short": "Ziebach",
			"long": "Ziebach County, SD"
		},
		"47000": {
			"short": "TN",
			"long": "Tennessee"
		},
		"47001": {
			"short": "Anderson",
			"long": "Anderson County, TN"
		},
		"47003": {
			"short": "Bedford",
			"long": "Bedford County, TN"
		},
		"47005": {
			"short": "Benton",
			"long": "Benton County, TN"
		},
		"47007": {
			"short": "Bledsoe",
			"long": "Bledsoe County, TN"
		},
		"47009": {
			"short": "Blount",
			"long": "Blount County, TN"
		},
		"47011": {
			"short": "Bradley",
			"long": "Bradley County, TN"
		},
		"47013": {
			"short": "Campbell",
			"long": "Campbell County, TN"
		},
		"47015": {
			"short": "Cannon",
			"long": "Cannon County, TN"
		},
		"47017": {
			"short": "Carroll",
			"long": "Carroll County, TN"
		},
		"47019": {
			"short": "Carter",
			"long": "Carter County, TN"
		},
		"47021": {
			"short": "Cheatham",
			"long": "Cheatham County, TN"
		},
		"47023": {
			"short": "Chester",
			"long": "Chester County, TN"
		},
		"47025": {
			"short": "Claiborne",
			"long": "Claiborne County, TN"
		},
		"47027": {
			"short": "Clay",
			"long": "Clay County, TN"
		},
		"47029": {
			"short": "Cocke",
			"long": "Cocke County, TN"
		},
		"47031": {
			"short": "Coffee",
			"long": "Coffee County, TN"
		},
		"47033": {
			"short": "Crockett",
			"long": "Crockett County, TN"
		},
		"47035": {
			"short": "Cumberland",
			"long": "Cumberland County, TN"
		},
		"47037": {
			"short": "Davidson",
			"long": "Davidson County, TN"
		},
		"47039": {
			"short": "Decatur",
			"long": "Decatur County, TN"
		},
		"47041": {
			"short": "DeKalb",
			"long": "DeKalb County, TN"
		},
		"47043": {
			"short": "Dickson",
			"long": "Dickson County, TN"
		},
		"47045": {
			"short": "Dyer",
			"long": "Dyer County, TN"
		},
		"47047": {
			"short": "Fayette",
			"long": "Fayette County, TN"
		},
		"47049": {
			"short": "Fentress",
			"long": "Fentress County, TN"
		},
		"47051": {
			"short": "Franklin",
			"long": "Franklin County, TN"
		},
		"47053": {
			"short": "Gibson",
			"long": "Gibson County, TN"
		},
		"47055": {
			"short": "Giles",
			"long": "Giles County, TN"
		},
		"47057": {
			"short": "Grainger",
			"long": "Grainger County, TN"
		},
		"47059": {
			"short": "Greene",
			"long": "Greene County, TN"
		},
		"47061": {
			"short": "Grundy",
			"long": "Grundy County, TN"
		},
		"47063": {
			"short": "Hamblen",
			"long": "Hamblen County, TN"
		},
		"47065": {
			"short": "Hamilton",
			"long": "Hamilton County, TN"
		},
		"47067": {
			"short": "Hancock",
			"long": "Hancock County, TN"
		},
		"47069": {
			"short": "Hardeman",
			"long": "Hardeman County, TN"
		},
		"47071": {
			"short": "Hardin",
			"long": "Hardin County, TN"
		},
		"47073": {
			"short": "Hawkins",
			"long": "Hawkins County, TN"
		},
		"47075": {
			"short": "Haywood",
			"long": "Haywood County, TN"
		},
		"47077": {
			"short": "Henderson",
			"long": "Henderson County, TN"
		},
		"47079": {
			"short": "Henry",
			"long": "Henry County, TN"
		},
		"47081": {
			"short": "Hickman",
			"long": "Hickman County, TN"
		},
		"47083": {
			"short": "Houston",
			"long": "Houston County, TN"
		},
		"47085": {
			"short": "Humphreys",
			"long": "Humphreys County, TN"
		},
		"47087": {
			"short": "Jackson",
			"long": "Jackson County, TN"
		},
		"47089": {
			"short": "Jefferson",
			"long": "Jefferson County, TN"
		},
		"47091": {
			"short": "Johnson",
			"long": "Johnson County, TN"
		},
		"47093": {
			"short": "Knox",
			"long": "Knox County, TN"
		},
		"47095": {
			"short": "Lake",
			"long": "Lake County, TN"
		},
		"47097": {
			"short": "Lauderdale",
			"long": "Lauderdale County, TN"
		},
		"47099": {
			"short": "Lawrence",
			"long": "Lawrence County, TN"
		},
		"47101": {
			"short": "Lewis",
			"long": "Lewis County, TN"
		},
		"47103": {
			"short": "Lincoln",
			"long": "Lincoln County, TN"
		},
		"47105": {
			"short": "Loudon",
			"long": "Loudon County, TN"
		},
		"47107": {
			"short": "McMinn",
			"long": "McMinn County, TN"
		},
		"47109": {
			"short": "McNairy",
			"long": "McNairy County, TN"
		},
		"47111": {
			"short": "Macon",
			"long": "Macon County, TN"
		},
		"47113": {
			"short": "Madison",
			"long": "Madison County, TN"
		},
		"47115": {
			"short": "Marion",
			"long": "Marion County, TN"
		},
		"47117": {
			"short": "Marshall",
			"long": "Marshall County, TN"
		},
		"47119": {
			"short": "Maury",
			"long": "Maury County, TN"
		},
		"47121": {
			"short": "Meigs",
			"long": "Meigs County, TN"
		},
		"47123": {
			"short": "Monroe",
			"long": "Monroe County, TN"
		},
		"47125": {
			"short": "Montgomery",
			"long": "Montgomery County, TN"
		},
		"47127": {
			"short": "Moore",
			"long": "Moore County, TN"
		},
		"47129": {
			"short": "Morgan",
			"long": "Morgan County, TN"
		},
		"47131": {
			"short": "Obion",
			"long": "Obion County, TN"
		},
		"47133": {
			"short": "Overton",
			"long": "Overton County, TN"
		},
		"47135": {
			"short": "Perry",
			"long": "Perry County, TN"
		},
		"47137": {
			"short": "Pickett",
			"long": "Pickett County, TN"
		},
		"47139": {
			"short": "Polk",
			"long": "Polk County, TN"
		},
		"47141": {
			"short": "Putnam",
			"long": "Putnam County, TN"
		},
		"47143": {
			"short": "Rhea",
			"long": "Rhea County, TN"
		},
		"47145": {
			"short": "Roane",
			"long": "Roane County, TN"
		},
		"47147": {
			"short": "Robertson",
			"long": "Robertson County, TN"
		},
		"47149": {
			"short": "Rutherford",
			"long": "Rutherford County, TN"
		},
		"47151": {
			"short": "Scott",
			"long": "Scott County, TN"
		},
		"47153": {
			"short": "Sequatchie",
			"long": "Sequatchie County, TN"
		},
		"47155": {
			"short": "Sevier",
			"long": "Sevier County, TN"
		},
		"47157": {
			"short": "Shelby",
			"long": "Shelby County, TN"
		},
		"47159": {
			"short": "Smith",
			"long": "Smith County, TN"
		},
		"47161": {
			"short": "Stewart",
			"long": "Stewart County, TN"
		},
		"47163": {
			"short": "Sullivan",
			"long": "Sullivan County, TN"
		},
		"47165": {
			"short": "Sumner",
			"long": "Sumner County, TN"
		},
		"47167": {
			"short": "Tipton",
			"long": "Tipton County, TN"
		},
		"47169": {
			"short": "Trousdale",
			"long": "Trousdale County, TN"
		},
		"47171": {
			"short": "Unicoi",
			"long": "Unicoi County, TN"
		},
		"47173": {
			"short": "Union",
			"long": "Union County, TN"
		},
		"47175": {
			"short": "Van Buren",
			"long": "Van Buren County, TN"
		},
		"47177": {
			"short": "Warren",
			"long": "Warren County, TN"
		},
		"47179": {
			"short": "Washington",
			"long": "Washington County, TN"
		},
		"47181": {
			"short": "Wayne",
			"long": "Wayne County, TN"
		},
		"47183": {
			"short": "Weakley",
			"long": "Weakley County, TN"
		},
		"47185": {
			"short": "White",
			"long": "White County, TN"
		},
		"47187": {
			"short": "Williamson",
			"long": "Williamson County, TN"
		},
		"47189": {
			"short": "Wilson",
			"long": "Wilson County, TN"
		},
		"48000": {
			"short": "TX",
			"long": "Texas"
		},
		"48001": {
			"short": "Anderson",
			"long": "Anderson County, TX"
		},
		"48003": {
			"short": "Andrews",
			"long": "Andrews County, TX"
		},
		"48005": {
			"short": "Angelina",
			"long": "Angelina County, TX"
		},
		"48007": {
			"short": "Aransas",
			"long": "Aransas County, TX"
		},
		"48009": {
			"short": "Archer",
			"long": "Archer County, TX"
		},
		"48011": {
			"short": "Armstrong",
			"long": "Armstrong County, TX"
		},
		"48013": {
			"short": "Atascosa",
			"long": "Atascosa County, TX"
		},
		"48015": {
			"short": "Austin",
			"long": "Austin County, TX"
		},
		"48017": {
			"short": "Bailey",
			"long": "Bailey County, TX"
		},
		"48019": {
			"short": "Bandera",
			"long": "Bandera County, TX"
		},
		"48021": {
			"short": "Bastrop",
			"long": "Bastrop County, TX"
		},
		"48023": {
			"short": "Baylor",
			"long": "Baylor County, TX"
		},
		"48025": {
			"short": "Bee",
			"long": "Bee County, TX"
		},
		"48027": {
			"short": "Bell",
			"long": "Bell County, TX"
		},
		"48029": {
			"short": "Bexar",
			"long": "Bexar County, TX"
		},
		"48031": {
			"short": "Blanco",
			"long": "Blanco County, TX"
		},
		"48033": {
			"short": "Borden",
			"long": "Borden County, TX"
		},
		"48035": {
			"short": "Bosque",
			"long": "Bosque County, TX"
		},
		"48037": {
			"short": "Bowie",
			"long": "Bowie County, TX"
		},
		"48039": {
			"short": "Brazoria",
			"long": "Brazoria County, TX"
		},
		"48041": {
			"short": "Brazos",
			"long": "Brazos County, TX"
		},
		"48043": {
			"short": "Brewster",
			"long": "Brewster County, TX"
		},
		"48045": {
			"short": "Briscoe",
			"long": "Briscoe County, TX"
		},
		"48047": {
			"short": "Brooks",
			"long": "Brooks County, TX"
		},
		"48049": {
			"short": "Brown",
			"long": "Brown County, TX"
		},
		"48051": {
			"short": "Burleson",
			"long": "Burleson County, TX"
		},
		"48053": {
			"short": "Burnet",
			"long": "Burnet County, TX"
		},
		"48055": {
			"short": "Caldwell",
			"long": "Caldwell County, TX"
		},
		"48057": {
			"short": "Calhoun",
			"long": "Calhoun County, TX"
		},
		"48059": {
			"short": "Callahan",
			"long": "Callahan County, TX"
		},
		"48061": {
			"short": "Cameron",
			"long": "Cameron County, TX"
		},
		"48063": {
			"short": "Camp",
			"long": "Camp County, TX"
		},
		"48065": {
			"short": "Carson",
			"long": "Carson County, TX"
		},
		"48067": {
			"short": "Cass",
			"long": "Cass County, TX"
		},
		"48069": {
			"short": "Castro",
			"long": "Castro County, TX"
		},
		"48071": {
			"short": "Chambers",
			"long": "Chambers County, TX"
		},
		"48073": {
			"short": "Cherokee",
			"long": "Cherokee County, TX"
		},
		"48075": {
			"short": "Childress",
			"long": "Childress County, TX"
		},
		"48077": {
			"short": "Clay",
			"long": "Clay County, TX"
		},
		"48079": {
			"short": "Cochran",
			"long": "Cochran County, TX"
		},
		"48081": {
			"short": "Coke",
			"long": "Coke County, TX"
		},
		"48083": {
			"short": "Coleman",
			"long": "Coleman County, TX"
		},
		"48085": {
			"short": "Collin",
			"long": "Collin County, TX"
		},
		"48087": {
			"short": "Collingsworth",
			"long": "Collingsworth County, TX"
		},
		"48089": {
			"short": "Colorado",
			"long": "Colorado County, TX"
		},
		"48091": {
			"short": "Comal",
			"long": "Comal County, TX"
		},
		"48093": {
			"short": "Comanche",
			"long": "Comanche County, TX"
		},
		"48095": {
			"short": "Concho",
			"long": "Concho County, TX"
		},
		"48097": {
			"short": "Cooke",
			"long": "Cooke County, TX"
		},
		"48099": {
			"short": "Coryell",
			"long": "Coryell County, TX"
		},
		"48101": {
			"short": "Cottle",
			"long": "Cottle County, TX"
		},
		"48103": {
			"short": "Crane",
			"long": "Crane County, TX"
		},
		"48105": {
			"short": "Crockett",
			"long": "Crockett County, TX"
		},
		"48107": {
			"short": "Crosby",
			"long": "Crosby County, TX"
		},
		"48109": {
			"short": "Culberson",
			"long": "Culberson County, TX"
		},
		"48111": {
			"short": "Dallam",
			"long": "Dallam County, TX"
		},
		"48113": {
			"short": "Dallas",
			"long": "Dallas County, TX"
		},
		"48115": {
			"short": "Dawson",
			"long": "Dawson County, TX"
		},
		"48117": {
			"short": "Deaf Smith",
			"long": "Deaf Smith County, TX"
		},
		"48119": {
			"short": "Delta",
			"long": "Delta County, TX"
		},
		"48121": {
			"short": "Denton",
			"long": "Denton County, TX"
		},
		"48123": {
			"short": "DeWitt",
			"long": "DeWitt County, TX"
		},
		"48125": {
			"short": "Dickens",
			"long": "Dickens County, TX"
		},
		"48127": {
			"short": "Dimmit",
			"long": "Dimmit County, TX"
		},
		"48129": {
			"short": "Donley",
			"long": "Donley County, TX"
		},
		"48131": {
			"short": "Duval",
			"long": "Duval County, TX"
		},
		"48133": {
			"short": "Eastland",
			"long": "Eastland County, TX"
		},
		"48135": {
			"short": "Ector",
			"long": "Ector County, TX"
		},
		"48137": {
			"short": "Edwards",
			"long": "Edwards County, TX"
		},
		"48139": {
			"short": "Ellis",
			"long": "Ellis County, TX"
		},
		"48141": {
			"short": "El Paso",
			"long": "El Paso County, TX"
		},
		"48143": {
			"short": "Erath",
			"long": "Erath County, TX"
		},
		"48145": {
			"short": "Falls",
			"long": "Falls County, TX"
		},
		"48147": {
			"short": "Fannin",
			"long": "Fannin County, TX"
		},
		"48149": {
			"short": "Fayette",
			"long": "Fayette County, TX"
		},
		"48151": {
			"short": "Fisher",
			"long": "Fisher County, TX"
		},
		"48153": {
			"short": "Floyd",
			"long": "Floyd County, TX"
		},
		"48155": {
			"short": "Foard",
			"long": "Foard County, TX"
		},
		"48157": {
			"short": "Fort Bend",
			"long": "Fort Bend County, TX"
		},
		"48159": {
			"short": "Franklin",
			"long": "Franklin County, TX"
		},
		"48161": {
			"short": "Freestone",
			"long": "Freestone County, TX"
		},
		"48163": {
			"short": "Frio",
			"long": "Frio County, TX"
		},
		"48165": {
			"short": "Gaines",
			"long": "Gaines County, TX"
		},
		"48167": {
			"short": "Galveston",
			"long": "Galveston County, TX"
		},
		"48169": {
			"short": "Garza",
			"long": "Garza County, TX"
		},
		"48171": {
			"short": "Gillespie",
			"long": "Gillespie County, TX"
		},
		"48173": {
			"short": "Glasscock",
			"long": "Glasscock County, TX"
		},
		"48175": {
			"short": "Goliad",
			"long": "Goliad County, TX"
		},
		"48177": {
			"short": "Gonzales",
			"long": "Gonzales County, TX"
		},
		"48179": {
			"short": "Gray",
			"long": "Gray County, TX"
		},
		"48181": {
			"short": "Grayson",
			"long": "Grayson County, TX"
		},
		"48183": {
			"short": "Gregg",
			"long": "Gregg County, TX"
		},
		"48185": {
			"short": "Grimes",
			"long": "Grimes County, TX"
		},
		"48187": {
			"short": "Guadalupe",
			"long": "Guadalupe County, TX"
		},
		"48189": {
			"short": "Hale",
			"long": "Hale County, TX"
		},
		"48191": {
			"short": "Hall",
			"long": "Hall County, TX"
		},
		"48193": {
			"short": "Hamilton",
			"long": "Hamilton County, TX"
		},
		"48195": {
			"short": "Hansford",
			"long": "Hansford County, TX"
		},
		"48197": {
			"short": "Hardeman",
			"long": "Hardeman County, TX"
		},
		"48199": {
			"short": "Hardin",
			"long": "Hardin County, TX"
		},
		"48201": {
			"short": "Harris",
			"long": "Harris County, TX"
		},
		"48203": {
			"short": "Harrison",
			"long": "Harrison County, TX"
		},
		"48205": {
			"short": "Hartley",
			"long": "Hartley County, TX"
		},
		"48207": {
			"short": "Haskell",
			"long": "Haskell County, TX"
		},
		"48209": {
			"short": "Hays",
			"long": "Hays County, TX"
		},
		"48211": {
			"short": "Hemphill",
			"long": "Hemphill County, TX"
		},
		"48213": {
			"short": "Henderson",
			"long": "Henderson County, TX"
		},
		"48215": {
			"short": "Hidalgo",
			"long": "Hidalgo County, TX"
		},
		"48217": {
			"short": "Hill",
			"long": "Hill County, TX"
		},
		"48219": {
			"short": "Hockley",
			"long": "Hockley County, TX"
		},
		"48221": {
			"short": "Hood",
			"long": "Hood County, TX"
		},
		"48223": {
			"short": "Hopkins",
			"long": "Hopkins County, TX"
		},
		"48225": {
			"short": "Houston",
			"long": "Houston County, TX"
		},
		"48227": {
			"short": "Howard",
			"long": "Howard County, TX"
		},
		"48229": {
			"short": "Hudspeth",
			"long": "Hudspeth County, TX"
		},
		"48231": {
			"short": "Hunt",
			"long": "Hunt County, TX"
		},
		"48233": {
			"short": "Hutchinson",
			"long": "Hutchinson County, TX"
		},
		"48235": {
			"short": "Irion",
			"long": "Irion County, TX"
		},
		"48237": {
			"short": "Jack",
			"long": "Jack County, TX"
		},
		"48239": {
			"short": "Jackson",
			"long": "Jackson County, TX"
		},
		"48241": {
			"short": "Jasper",
			"long": "Jasper County, TX"
		},
		"48243": {
			"short": "Jeff Davis",
			"long": "Jeff Davis County, TX"
		},
		"48245": {
			"short": "Jefferson",
			"long": "Jefferson County, TX"
		},
		"48247": {
			"short": "Jim Hogg",
			"long": "Jim Hogg County, TX"
		},
		"48249": {
			"short": "Jim Wells",
			"long": "Jim Wells County, TX"
		},
		"48251": {
			"short": "Johnson",
			"long": "Johnson County, TX"
		},
		"48253": {
			"short": "Jones",
			"long": "Jones County, TX"
		},
		"48255": {
			"short": "Karnes",
			"long": "Karnes County, TX"
		},
		"48257": {
			"short": "Kaufman",
			"long": "Kaufman County, TX"
		},
		"48259": {
			"short": "Kendall",
			"long": "Kendall County, TX"
		},
		"48261": {
			"short": "Kenedy",
			"long": "Kenedy County, TX"
		},
		"48263": {
			"short": "Kent",
			"long": "Kent County, TX"
		},
		"48265": {
			"short": "Kerr",
			"long": "Kerr County, TX"
		},
		"48267": {
			"short": "Kimble",
			"long": "Kimble County, TX"
		},
		"48269": {
			"short": "King",
			"long": "King County, TX"
		},
		"48271": {
			"short": "Kinney",
			"long": "Kinney County, TX"
		},
		"48273": {
			"short": "Kleberg",
			"long": "Kleberg County, TX"
		},
		"48275": {
			"short": "Knox",
			"long": "Knox County, TX"
		},
		"48277": {
			"short": "Lamar",
			"long": "Lamar County, TX"
		},
		"48279": {
			"short": "Lamb",
			"long": "Lamb County, TX"
		},
		"48281": {
			"short": "Lampasas",
			"long": "Lampasas County, TX"
		},
		"48283": {
			"short": "La Salle",
			"long": "La Salle County, TX"
		},
		"48285": {
			"short": "Lavaca",
			"long": "Lavaca County, TX"
		},
		"48287": {
			"short": "Lee",
			"long": "Lee County, TX"
		},
		"48289": {
			"short": "Leon",
			"long": "Leon County, TX"
		},
		"48291": {
			"short": "Liberty",
			"long": "Liberty County, TX"
		},
		"48293": {
			"short": "Limestone",
			"long": "Limestone County, TX"
		},
		"48295": {
			"short": "Lipscomb",
			"long": "Lipscomb County, TX"
		},
		"48297": {
			"short": "Live Oak",
			"long": "Live Oak County, TX"
		},
		"48299": {
			"short": "Llano",
			"long": "Llano County, TX"
		},
		"48301": {
			"short": "Loving",
			"long": "Loving County, TX"
		},
		"48303": {
			"short": "Lubbock",
			"long": "Lubbock County, TX"
		},
		"48305": {
			"short": "Lynn",
			"long": "Lynn County, TX"
		},
		"48307": {
			"short": "McCulloch",
			"long": "McCulloch County, TX"
		},
		"48309": {
			"short": "McLennan",
			"long": "McLennan County, TX"
		},
		"48311": {
			"short": "McMullen",
			"long": "McMullen County, TX"
		},
		"48313": {
			"short": "Madison",
			"long": "Madison County, TX"
		},
		"48315": {
			"short": "Marion",
			"long": "Marion County, TX"
		},
		"48317": {
			"short": "Martin",
			"long": "Martin County, TX"
		},
		"48319": {
			"short": "Mason",
			"long": "Mason County, TX"
		},
		"48321": {
			"short": "Matagorda",
			"long": "Matagorda County, TX"
		},
		"48323": {
			"short": "Maverick",
			"long": "Maverick County, TX"
		},
		"48325": {
			"short": "Medina",
			"long": "Medina County, TX"
		},
		"48327": {
			"short": "Menard",
			"long": "Menard County, TX"
		},
		"48329": {
			"short": "Midland",
			"long": "Midland County, TX"
		},
		"48331": {
			"short": "Milam",
			"long": "Milam County, TX"
		},
		"48333": {
			"short": "Mills",
			"long": "Mills County, TX"
		},
		"48335": {
			"short": "Mitchell",
			"long": "Mitchell County, TX"
		},
		"48337": {
			"short": "Montague",
			"long": "Montague County, TX"
		},
		"48339": {
			"short": "Montgomery",
			"long": "Montgomery County, TX"
		},
		"48341": {
			"short": "Moore",
			"long": "Moore County, TX"
		},
		"48343": {
			"short": "Morris",
			"long": "Morris County, TX"
		},
		"48345": {
			"short": "Motley",
			"long": "Motley County, TX"
		},
		"48347": {
			"short": "Nacogdoches",
			"long": "Nacogdoches County, TX"
		},
		"48349": {
			"short": "Navarro",
			"long": "Navarro County, TX"
		},
		"48351": {
			"short": "Newton",
			"long": "Newton County, TX"
		},
		"48353": {
			"short": "Nolan",
			"long": "Nolan County, TX"
		},
		"48355": {
			"short": "Nueces",
			"long": "Nueces County, TX"
		},
		"48357": {
			"short": "Ochiltree",
			"long": "Ochiltree County, TX"
		},
		"48359": {
			"short": "Oldham",
			"long": "Oldham County, TX"
		},
		"48361": {
			"short": "Orange",
			"long": "Orange County, TX"
		},
		"48363": {
			"short": "Palo Pinto",
			"long": "Palo Pinto County, TX"
		},
		"48365": {
			"short": "Panola",
			"long": "Panola County, TX"
		},
		"48367": {
			"short": "Parker",
			"long": "Parker County, TX"
		},
		"48369": {
			"short": "Parmer",
			"long": "Parmer County, TX"
		},
		"48371": {
			"short": "Pecos",
			"long": "Pecos County, TX"
		},
		"48373": {
			"short": "Polk",
			"long": "Polk County, TX"
		},
		"48375": {
			"short": "Potter",
			"long": "Potter County, TX"
		},
		"48377": {
			"short": "Presidio",
			"long": "Presidio County, TX"
		},
		"48379": {
			"short": "Rains",
			"long": "Rains County, TX"
		},
		"48381": {
			"short": "Randall",
			"long": "Randall County, TX"
		},
		"48383": {
			"short": "Reagan",
			"long": "Reagan County, TX"
		},
		"48385": {
			"short": "Real",
			"long": "Real County, TX"
		},
		"48387": {
			"short": "Red River",
			"long": "Red River County, TX"
		},
		"48389": {
			"short": "Reeves",
			"long": "Reeves County, TX"
		},
		"48391": {
			"short": "Refugio",
			"long": "Refugio County, TX"
		},
		"48393": {
			"short": "Roberts",
			"long": "Roberts County, TX"
		},
		"48395": {
			"short": "Robertson",
			"long": "Robertson County, TX"
		},
		"48397": {
			"short": "Rockwall",
			"long": "Rockwall County, TX"
		},
		"48399": {
			"short": "Runnels",
			"long": "Runnels County, TX"
		},
		"48401": {
			"short": "Rusk",
			"long": "Rusk County, TX"
		},
		"48403": {
			"short": "Sabine",
			"long": "Sabine County, TX"
		},
		"48405": {
			"short": "San Augustine",
			"long": "San Augustine County, TX"
		},
		"48407": {
			"short": "San Jacinto",
			"long": "San Jacinto County, TX"
		},
		"48409": {
			"short": "San Patricio",
			"long": "San Patricio County, TX"
		},
		"48411": {
			"short": "San Saba",
			"long": "San Saba County, TX"
		},
		"48413": {
			"short": "Schleicher",
			"long": "Schleicher County, TX"
		},
		"48415": {
			"short": "Scurry",
			"long": "Scurry County, TX"
		},
		"48417": {
			"short": "Shackelford",
			"long": "Shackelford County, TX"
		},
		"48419": {
			"short": "Shelby",
			"long": "Shelby County, TX"
		},
		"48421": {
			"short": "Sherman",
			"long": "Sherman County, TX"
		},
		"48423": {
			"short": "Smith",
			"long": "Smith County, TX"
		},
		"48425": {
			"short": "Somervell",
			"long": "Somervell County, TX"
		},
		"48427": {
			"short": "Starr",
			"long": "Starr County, TX"
		},
		"48429": {
			"short": "Stephens",
			"long": "Stephens County, TX"
		},
		"48431": {
			"short": "Sterling",
			"long": "Sterling County, TX"
		},
		"48433": {
			"short": "Stonewall",
			"long": "Stonewall County, TX"
		},
		"48435": {
			"short": "Sutton",
			"long": "Sutton County, TX"
		},
		"48437": {
			"short": "Swisher",
			"long": "Swisher County, TX"
		},
		"48439": {
			"short": "Tarrant",
			"long": "Tarrant County, TX"
		},
		"48441": {
			"short": "Taylor",
			"long": "Taylor County, TX"
		},
		"48443": {
			"short": "Terrell",
			"long": "Terrell County, TX"
		},
		"48445": {
			"short": "Terry",
			"long": "Terry County, TX"
		},
		"48447": {
			"short": "Throckmorton",
			"long": "Throckmorton County, TX"
		},
		"48449": {
			"short": "Titus",
			"long": "Titus County, TX"
		},
		"48451": {
			"short": "Tom Green",
			"long": "Tom Green County, TX"
		},
		"48453": {
			"short": "Travis",
			"long": "Travis County, TX"
		},
		"48455": {
			"short": "Trinity",
			"long": "Trinity County, TX"
		},
		"48457": {
			"short": "Tyler",
			"long": "Tyler County, TX"
		},
		"48459": {
			"short": "Upshur",
			"long": "Upshur County, TX"
		},
		"48461": {
			"short": "Upton",
			"long": "Upton County, TX"
		},
		"48463": {
			"short": "Uvalde",
			"long": "Uvalde County, TX"
		},
		"48465": {
			"short": "Val Verde",
			"long": "Val Verde County, TX"
		},
		"48467": {
			"short": "Van Zandt",
			"long": "Van Zandt County, TX"
		},
		"48469": {
			"short": "Victoria",
			"long": "Victoria County, TX"
		},
		"48471": {
			"short": "Walker",
			"long": "Walker County, TX"
		},
		"48473": {
			"short": "Waller",
			"long": "Waller County, TX"
		},
		"48475": {
			"short": "Ward",
			"long": "Ward County, TX"
		},
		"48477": {
			"short": "Washington",
			"long": "Washington County, TX"
		},
		"48479": {
			"short": "Webb",
			"long": "Webb County, TX"
		},
		"48481": {
			"short": "Wharton",
			"long": "Wharton County, TX"
		},
		"48483": {
			"short": "Wheeler",
			"long": "Wheeler County, TX"
		},
		"48485": {
			"short": "Wichita",
			"long": "Wichita County, TX"
		},
		"48487": {
			"short": "Wilbarger",
			"long": "Wilbarger County, TX"
		},
		"48489": {
			"short": "Willacy",
			"long": "Willacy County, TX"
		},
		"48491": {
			"short": "Williamson",
			"long": "Williamson County, TX"
		},
		"48493": {
			"short": "Wilson",
			"long": "Wilson County, TX"
		},
		"48495": {
			"short": "Winkler",
			"long": "Winkler County, TX"
		},
		"48497": {
			"short": "Wise",
			"long": "Wise County, TX"
		},
		"48499": {
			"short": "Wood",
			"long": "Wood County, TX"
		},
		"48501": {
			"short": "Yoakum",
			"long": "Yoakum County, TX"
		},
		"48503": {
			"short": "Young",
			"long": "Young County, TX"
		},
		"48505": {
			"short": "Zapata",
			"long": "Zapata County, TX"
		},
		"48507": {
			"short": "Zavala",
			"long": "Zavala County, TX"
		},
		"49000": {
			"short": "UT",
			"long": "Utah"
		},
		"49001": {
			"short": "Beaver",
			"long": "Beaver County, UT"
		},
		"49003": {
			"short": "Box Elder",
			"long": "Box Elder County, UT"
		},
		"49005": {
			"short": "Cache",
			"long": "Cache County, UT"
		},
		"49007": {
			"short": "Carbon",
			"long": "Carbon County, UT"
		},
		"49009": {
			"short": "Daggett",
			"long": "Daggett County, UT"
		},
		"49011": {
			"short": "Davis",
			"long": "Davis County, UT"
		},
		"49013": {
			"short": "Duchesne",
			"long": "Duchesne County, UT"
		},
		"49015": {
			"short": "Emery",
			"long": "Emery County, UT"
		},
		"49017": {
			"short": "Garfield",
			"long": "Garfield County, UT"
		},
		"49019": {
			"short": "Grand",
			"long": "Grand County, UT"
		},
		"49021": {
			"short": "Iron",
			"long": "Iron County, UT"
		},
		"49023": {
			"short": "Juab",
			"long": "Juab County, UT"
		},
		"49025": {
			"short": "Kane",
			"long": "Kane County, UT"
		},
		"49027": {
			"short": "Millard",
			"long": "Millard County, UT"
		},
		"49029": {
			"short": "Morgan",
			"long": "Morgan County, UT"
		},
		"49031": {
			"short": "Piute",
			"long": "Piute County, UT"
		},
		"49033": {
			"short": "Rich",
			"long": "Rich County, UT"
		},
		"49035": {
			"short": "Salt Lake",
			"long": "Salt Lake County, UT"
		},
		"49037": {
			"short": "San Juan",
			"long": "San Juan County, UT"
		},
		"49039": {
			"short": "Sanpete",
			"long": "Sanpete County, UT"
		},
		"49041": {
			"short": "Sevier",
			"long": "Sevier County, UT"
		},
		"49043": {
			"short": "Summit",
			"long": "Summit County, UT"
		},
		"49045": {
			"short": "Tooele",
			"long": "Tooele County, UT"
		},
		"49047": {
			"short": "Uintah",
			"long": "Uintah County, UT"
		},
		"49049": {
			"short": "Utah",
			"long": "Utah County, UT"
		},
		"49051": {
			"short": "Wasatch",
			"long": "Wasatch County, UT"
		},
		"49053": {
			"short": "Washington",
			"long": "Washington County, UT"
		},
		"49055": {
			"short": "Wayne",
			"long": "Wayne County, UT"
		},
		"49057": {
			"short": "Weber",
			"long": "Weber County, UT"
		},
		"50000": {
			"short": "VT",
			"long": "Vermont"
		},
		"50001": {
			"short": "Addison",
			"long": "Addison County, VT"
		},
		"50003": {
			"short": "Bennington",
			"long": "Bennington County, VT"
		},
		"50005": {
			"short": "Caledonia",
			"long": "Caledonia County, VT"
		},
		"50007": {
			"short": "Chittenden",
			"long": "Chittenden County, VT"
		},
		"50009": {
			"short": "Essex",
			"long": "Essex County, VT"
		},
		"50011": {
			"short": "Franklin",
			"long": "Franklin County, VT"
		},
		"50013": {
			"short": "Grand Isle",
			"long": "Grand Isle County, VT"
		},
		"50015": {
			"short": "Lamoille",
			"long": "Lamoille County, VT"
		},
		"50017": {
			"short": "Orange",
			"long": "Orange County, VT"
		},
		"50019": {
			"short": "Orleans",
			"long": "Orleans County, VT"
		},
		"50021": {
			"short": "Rutland",
			"long": "Rutland County, VT"
		},
		"50023": {
			"short": "Washington",
			"long": "Washington County, VT"
		},
		"50025": {
			"short": "Windham",
			"long": "Windham County, VT"
		},
		"50027": {
			"short": "Windsor",
			"long": "Windsor County, VT"
		},
		"51000": {
			"short": "VA",
			"long": "Virginia"
		},
		"51001": {
			"short": "Accomack",
			"long": "Accomack County, VA"
		},
		"51003": {
			"short": "Albemarle",
			"long": "Albemarle County, VA"
		},
		"51005": {
			"short": "Alleghany",
			"long": "Alleghany County, VA"
		},
		"51007": {
			"short": "Amelia",
			"long": "Amelia County, VA"
		},
		"51009": {
			"short": "Amherst",
			"long": "Amherst County, VA"
		},
		"51011": {
			"short": "Appomattox",
			"long": "Appomattox County, VA"
		},
		"51013": {
			"short": "Arlington",
			"long": "Arlington County, VA"
		},
		"51015": {
			"short": "Augusta",
			"long": "Augusta County, VA"
		},
		"51017": {
			"short": "Bath",
			"long": "Bath County, VA"
		},
		"51019": {
			"short": "Bedford",
			"long": "Bedford County, VA"
		},
		"51021": {
			"short": "Bland",
			"long": "Bland County, VA"
		},
		"51023": {
			"short": "Botetourt",
			"long": "Botetourt County, VA"
		},
		"51025": {
			"short": "Brunswick",
			"long": "Brunswick County, VA"
		},
		"51027": {
			"short": "Buchanan",
			"long": "Buchanan County, VA"
		},
		"51029": {
			"short": "Buckingham",
			"long": "Buckingham County, VA"
		},
		"51031": {
			"short": "Campbell",
			"long": "Campbell County, VA"
		},
		"51033": {
			"short": "Caroline",
			"long": "Caroline County, VA"
		},
		"51035": {
			"short": "Carroll",
			"long": "Carroll County, VA"
		},
		"51036": {
			"short": "Charles City",
			"long": "Charles City County, VA"
		},
		"51037": {
			"short": "Charlotte",
			"long": "Charlotte County, VA"
		},
		"51041": {
			"short": "Chesterfield",
			"long": "Chesterfield County, VA"
		},
		"51043": {
			"short": "Clarke",
			"long": "Clarke County, VA"
		},
		"51045": {
			"short": "Craig",
			"long": "Craig County, VA"
		},
		"51047": {
			"short": "Culpeper",
			"long": "Culpeper County, VA"
		},
		"51049": {
			"short": "Cumberland",
			"long": "Cumberland County, VA"
		},
		"51051": {
			"short": "Dickenson",
			"long": "Dickenson County, VA"
		},
		"51053": {
			"short": "Dinwiddie",
			"long": "Dinwiddie County, VA"
		},
		"51057": {
			"short": "Essex",
			"long": "Essex County, VA"
		},
		"51059": {
			"short": "Fairfax",
			"long": "Fairfax County, VA"
		},
		"51061": {
			"short": "Fauquier",
			"long": "Fauquier County, VA"
		},
		"51063": {
			"short": "Floyd",
			"long": "Floyd County, VA"
		},
		"51065": {
			"short": "Fluvanna",
			"long": "Fluvanna County, VA"
		},
		"51067": {
			"short": "Franklin",
			"long": "Franklin County, VA"
		},
		"51069": {
			"short": "Frederick",
			"long": "Frederick County, VA"
		},
		"51071": {
			"short": "Giles",
			"long": "Giles County, VA"
		},
		"51073": {
			"short": "Gloucester",
			"long": "Gloucester County, VA"
		},
		"51075": {
			"short": "Goochland",
			"long": "Goochland County, VA"
		},
		"51077": {
			"short": "Grayson",
			"long": "Grayson County, VA"
		},
		"51079": {
			"short": "Greene",
			"long": "Greene County, VA"
		},
		"51081": {
			"short": "Greensville",
			"long": "Greensville County, VA"
		},
		"51083": {
			"short": "Halifax",
			"long": "Halifax County, VA"
		},
		"51085": {
			"short": "Hanover",
			"long": "Hanover County, VA"
		},
		"51087": {
			"short": "Henrico",
			"long": "Henrico County, VA"
		},
		"51089": {
			"short": "Henry",
			"long": "Henry County, VA"
		},
		"51091": {
			"short": "Highland",
			"long": "Highland County, VA"
		},
		"51093": {
			"short": "Isle of Wight",
			"long": "Isle of Wight County, VA"
		},
		"51095": {
			"short": "James City",
			"long": "James City County, VA"
		},
		"51097": {
			"short": "King and Queen",
			"long": "King and Queen County, VA"
		},
		"51099": {
			"short": "King George",
			"long": "King George County, VA"
		},
		"51101": {
			"short": "King William",
			"long": "King William County, VA"
		},
		"51103": {
			"short": "Lancaster",
			"long": "Lancaster County, VA"
		},
		"51105": {
			"short": "Lee",
			"long": "Lee County, VA"
		},
		"51107": {
			"short": "Loudoun",
			"long": "Loudoun County, VA"
		},
		"51109": {
			"short": "Louisa",
			"long": "Louisa County, VA"
		},
		"51111": {
			"short": "Lunenburg",
			"long": "Lunenburg County, VA"
		},
		"51113": {
			"short": "Madison",
			"long": "Madison County, VA"
		},
		"51115": {
			"short": "Mathews",
			"long": "Mathews County, VA"
		},
		"51117": {
			"short": "Mecklenburg",
			"long": "Mecklenburg County, VA"
		},
		"51119": {
			"short": "Middlesex",
			"long": "Middlesex County, VA"
		},
		"51121": {
			"short": "Montgomery",
			"long": "Montgomery County, VA"
		},
		"51125": {
			"short": "Nelson",
			"long": "Nelson County, VA"
		},
		"51127": {
			"short": "New Kent",
			"long": "New Kent County, VA"
		},
		"51131": {
			"short": "Northampton",
			"long": "Northampton County, VA"
		},
		"51133": {
			"short": "Northumberland",
			"long": "Northumberland County, VA"
		},
		"51135": {
			"short": "Nottoway",
			"long": "Nottoway County, VA"
		},
		"51137": {
			"short": "Orange",
			"long": "Orange County, VA"
		},
		"51139": {
			"short": "Page",
			"long": "Page County, VA"
		},
		"51141": {
			"short": "Patrick",
			"long": "Patrick County, VA"
		},
		"51143": {
			"short": "Pittsylvania",
			"long": "Pittsylvania County, VA"
		},
		"51145": {
			"short": "Powhatan",
			"long": "Powhatan County, VA"
		},
		"51147": {
			"short": "Prince Edward",
			"long": "Prince Edward County, VA"
		},
		"51149": {
			"short": "Prince George",
			"long": "Prince George County, VA"
		},
		"51153": {
			"short": "Prince William",
			"long": "Prince William County, VA"
		},
		"51155": {
			"short": "Pulaski",
			"long": "Pulaski County, VA"
		},
		"51157": {
			"short": "Rappahannock",
			"long": "Rappahannock County, VA"
		},
		"51159": {
			"short": "Richmond",
			"long": "Richmond County, VA"
		},
		"51161": {
			"short": "Roanoke",
			"long": "Roanoke County, VA"
		},
		"51163": {
			"short": "Rockbridge",
			"long": "Rockbridge County, VA"
		},
		"51165": {
			"short": "Rockingham",
			"long": "Rockingham County, VA"
		},
		"51167": {
			"short": "Russell",
			"long": "Russell County, VA"
		},
		"51169": {
			"short": "Scott",
			"long": "Scott County, VA"
		},
		"51171": {
			"short": "Shenandoah",
			"long": "Shenandoah County, VA"
		},
		"51173": {
			"short": "Smyth",
			"long": "Smyth County, VA"
		},
		"51175": {
			"short": "Southampton",
			"long": "Southampton County, VA"
		},
		"51177": {
			"short": "Spotsylvania",
			"long": "Spotsylvania County, VA"
		},
		"51179": {
			"short": "Stafford",
			"long": "Stafford County, VA"
		},
		"51181": {
			"short": "Surry",
			"long": "Surry County, VA"
		},
		"51183": {
			"short": "Sussex",
			"long": "Sussex County, VA"
		},
		"51185": {
			"short": "Tazewell",
			"long": "Tazewell County, VA"
		},
		"51187": {
			"short": "Warren",
			"long": "Warren County, VA"
		},
		"51191": {
			"short": "Washington",
			"long": "Washington County, VA"
		},
		"51193": {
			"short": "Westmoreland",
			"long": "Westmoreland County, VA"
		},
		"51195": {
			"short": "Wise",
			"long": "Wise County, VA"
		},
		"51197": {
			"short": "Wythe",
			"long": "Wythe County, VA"
		},
		"51199": {
			"short": "York",
			"long": "York County, VA"
		},
		"51510": {
			"short": "Alexandria city",
			"long": "Alexandria city, VA"
		},
		"51515": {
			"short": "Bedford city",
			"long": "Bedford city, VA"
		},
		"51520": {
			"short": "Bristol city",
			"long": "Bristol city, VA"
		},
		"51530": {
			"short": "Buena Vista city",
			"long": "Buena Vista city, VA"
		},
		"51540": {
			"short": "Charlottesville city",
			"long": "Charlottesville city, VA"
		},
		"51550": {
			"short": "Chesapeake city",
			"long": "Chesapeake city, VA"
		},
		"51570": {
			"short": "Colonial Heights city",
			"long": "Colonial Heights city, VA"
		},
		"51580": {
			"short": "Covington city",
			"long": "Covington city, VA"
		},
		"51590": {
			"short": "Danville city",
			"long": "Danville city, VA"
		},
		"51595": {
			"short": "Emporia city",
			"long": "Emporia city, VA"
		},
		"51600": {
			"short": "Fairfax city",
			"long": "Fairfax city, VA"
		},
		"51610": {
			"short": "Falls Church city",
			"long": "Falls Church city, VA"
		},
		"51620": {
			"short": "Franklin city",
			"long": "Franklin city, VA"
		},
		"51630": {
			"short": "Fredericksburg city",
			"long": "Fredericksburg city, VA"
		},
		"51640": {
			"short": "Galax city",
			"long": "Galax city, VA"
		},
		"51650": {
			"short": "Hampton city",
			"long": "Hampton city, VA"
		},
		"51660": {
			"short": "Harrisonburg city",
			"long": "Harrisonburg city, VA"
		},
		"51670": {
			"short": "Hopewell city",
			"long": "Hopewell city, VA"
		},
		"51678": {
			"short": "Lexington city",
			"long": "Lexington city, VA"
		},
		"51680": {
			"short": "Lynchburg city",
			"long": "Lynchburg city, VA"
		},
		"51683": {
			"short": "Manassas city",
			"long": "Manassas city, VA"
		},
		"51685": {
			"short": "Manassas Park city",
			"long": "Manassas Park city, VA"
		},
		"51690": {
			"short": "Martinsville city",
			"long": "Martinsville city, VA"
		},
		"51700": {
			"short": "Newport News city",
			"long": "Newport News city, VA"
		},
		"51710": {
			"short": "Norfolk city",
			"long": "Norfolk city, VA"
		},
		"51720": {
			"short": "Norton city",
			"long": "Norton city, VA"
		},
		"51730": {
			"short": "Petersburg city",
			"long": "Petersburg city, VA"
		},
		"51735": {
			"short": "Poquoson city",
			"long": "Poquoson city, VA"
		},
		"51740": {
			"short": "Portsmouth city",
			"long": "Portsmouth city, VA"
		},
		"51750": {
			"short": "Radford city",
			"long": "Radford city, VA"
		},
		"51760": {
			"short": "Richmond city",
			"long": "Richmond city, VA"
		},
		"51770": {
			"short": "Roanoke city",
			"long": "Roanoke city, VA"
		},
		"51775": {
			"short": "Salem city",
			"long": "Salem city, VA"
		},
		"51790": {
			"short": "Staunton city",
			"long": "Staunton city, VA"
		},
		"51800": {
			"short": "Suffolk city",
			"long": "Suffolk city, VA"
		},
		"51810": {
			"short": "Virginia Beach city",
			"long": "Virginia Beach city, VA"
		},
		"51820": {
			"short": "Waynesboro city",
			"long": "Waynesboro city, VA"
		},
		"51830": {
			"short": "Williamsburg city",
			"long": "Williamsburg city, VA"
		},
		"51840": {
			"short": "Winchester city",
			"long": "Winchester city, VA"
		},
		"53000": {
			"short": "WA",
			"long": "Washington"
		},
		"53001": {
			"short": "Adams",
			"long": "Adams County, WA"
		},
		"53003": {
			"short": "Asotin",
			"long": "Asotin County, WA"
		},
		"53005": {
			"short": "Benton",
			"long": "Benton County, WA"
		},
		"53007": {
			"short": "Chelan",
			"long": "Chelan County, WA"
		},
		"53009": {
			"short": "Clallam",
			"long": "Clallam County, WA"
		},
		"53011": {
			"short": "Clark",
			"long": "Clark County, WA"
		},
		"53013": {
			"short": "Columbia",
			"long": "Columbia County, WA"
		},
		"53015": {
			"short": "Cowlitz",
			"long": "Cowlitz County, WA"
		},
		"53017": {
			"short": "Douglas",
			"long": "Douglas County, WA"
		},
		"53019": {
			"short": "Ferry",
			"long": "Ferry County, WA"
		},
		"53021": {
			"short": "Franklin",
			"long": "Franklin County, WA"
		},
		"53023": {
			"short": "Garfield",
			"long": "Garfield County, WA"
		},
		"53025": {
			"short": "Grant",
			"long": "Grant County, WA"
		},
		"53027": {
			"short": "Grays Harbor",
			"long": "Grays Harbor County, WA"
		},
		"53029": {
			"short": "Island",
			"long": "Island County, WA"
		},
		"53031": {
			"short": "Jefferson",
			"long": "Jefferson County, WA"
		},
		"53033": {
			"short": "King",
			"long": "King County, WA"
		},
		"53035": {
			"short": "Kitsap",
			"long": "Kitsap County, WA"
		},
		"53037": {
			"short": "Kittitas",
			"long": "Kittitas County, WA"
		},
		"53039": {
			"short": "Klickitat",
			"long": "Klickitat County, WA"
		},
		"53041": {
			"short": "Lewis",
			"long": "Lewis County, WA"
		},
		"53043": {
			"short": "Lincoln",
			"long": "Lincoln County, WA"
		},
		"53045": {
			"short": "Mason",
			"long": "Mason County, WA"
		},
		"53047": {
			"short": "Okanogan",
			"long": "Okanogan County, WA"
		},
		"53049": {
			"short": "Pacific",
			"long": "Pacific County, WA"
		},
		"53051": {
			"short": "Pend Oreille",
			"long": "Pend Oreille County, WA"
		},
		"53053": {
			"short": "Pierce",
			"long": "Pierce County, WA"
		},
		"53055": {
			"short": "San Juan",
			"long": "San Juan County, WA"
		},
		"53057": {
			"short": "Skagit",
			"long": "Skagit County, WA"
		},
		"53059": {
			"short": "Skamania",
			"long": "Skamania County, WA"
		},
		"53061": {
			"short": "Snohomish",
			"long": "Snohomish County, WA"
		},
		"53063": {
			"short": "Spokane",
			"long": "Spokane County, WA"
		},
		"53065": {
			"short": "Stevens",
			"long": "Stevens County, WA"
		},
		"53067": {
			"short": "Thurston",
			"long": "Thurston County, WA"
		},
		"53069": {
			"short": "Wahkiakum",
			"long": "Wahkiakum County, WA"
		},
		"53071": {
			"short": "Walla Walla",
			"long": "Walla Walla County, WA"
		},
		"53073": {
			"short": "Whatcom",
			"long": "Whatcom County, WA"
		},
		"53075": {
			"short": "Whitman",
			"long": "Whitman County, WA"
		},
		"53077": {
			"short": "Yakima",
			"long": "Yakima County, WA"
		},
		"54000": {
			"short": "WV",
			"long": "West Virginia"
		},
		"54001": {
			"short": "Barbour",
			"long": "Barbour County, WV"
		},
		"54003": {
			"short": "Berkeley",
			"long": "Berkeley County, WV"
		},
		"54005": {
			"short": "Boone",
			"long": "Boone County, WV"
		},
		"54007": {
			"short": "Braxton",
			"long": "Braxton County, WV"
		},
		"54009": {
			"short": "Brooke",
			"long": "Brooke County, WV"
		},
		"54011": {
			"short": "Cabell",
			"long": "Cabell County, WV"
		},
		"54013": {
			"short": "Calhoun",
			"long": "Calhoun County, WV"
		},
		"54015": {
			"short": "Clay",
			"long": "Clay County, WV"
		},
		"54017": {
			"short": "Doddridge",
			"long": "Doddridge County, WV"
		},
		"54019": {
			"short": "Fayette",
			"long": "Fayette County, WV"
		},
		"54021": {
			"short": "Gilmer",
			"long": "Gilmer County, WV"
		},
		"54023": {
			"short": "Grant",
			"long": "Grant County, WV"
		},
		"54025": {
			"short": "Greenbrier",
			"long": "Greenbrier County, WV"
		},
		"54027": {
			"short": "Hampshire",
			"long": "Hampshire County, WV"
		},
		"54029": {
			"short": "Hancock",
			"long": "Hancock County, WV"
		},
		"54031": {
			"short": "Hardy",
			"long": "Hardy County, WV"
		},
		"54033": {
			"short": "Harrison",
			"long": "Harrison County, WV"
		},
		"54035": {
			"short": "Jackson",
			"long": "Jackson County, WV"
		},
		"54037": {
			"short": "Jefferson",
			"long": "Jefferson County, WV"
		},
		"54039": {
			"short": "Kanawha",
			"long": "Kanawha County, WV"
		},
		"54041": {
			"short": "Lewis",
			"long": "Lewis County, WV"
		},
		"54043": {
			"short": "Lincoln",
			"long": "Lincoln County, WV"
		},
		"54045": {
			"short": "Logan",
			"long": "Logan County, WV"
		},
		"54047": {
			"short": "McDowell",
			"long": "McDowell County, WV"
		},
		"54049": {
			"short": "Marion",
			"long": "Marion County, WV"
		},
		"54051": {
			"short": "Marshall",
			"long": "Marshall County, WV"
		},
		"54053": {
			"short": "Mason",
			"long": "Mason County, WV"
		},
		"54055": {
			"short": "Mercer",
			"long": "Mercer County, WV"
		},
		"54057": {
			"short": "Mineral",
			"long": "Mineral County, WV"
		},
		"54059": {
			"short": "Mingo",
			"long": "Mingo County, WV"
		},
		"54061": {
			"short": "Monongalia",
			"long": "Monongalia County, WV"
		},
		"54063": {
			"short": "Monroe",
			"long": "Monroe County, WV"
		},
		"54065": {
			"short": "Morgan",
			"long": "Morgan County, WV"
		},
		"54067": {
			"short": "Nicholas",
			"long": "Nicholas County, WV"
		},
		"54069": {
			"short": "Ohio",
			"long": "Ohio County, WV"
		},
		"54071": {
			"short": "Pendleton",
			"long": "Pendleton County, WV"
		},
		"54073": {
			"short": "Pleasants",
			"long": "Pleasants County, WV"
		},
		"54075": {
			"short": "Pocahontas",
			"long": "Pocahontas County, WV"
		},
		"54077": {
			"short": "Preston",
			"long": "Preston County, WV"
		},
		"54079": {
			"short": "Putnam",
			"long": "Putnam County, WV"
		},
		"54081": {
			"short": "Raleigh",
			"long": "Raleigh County, WV"
		},
		"54083": {
			"short": "Randolph",
			"long": "Randolph County, WV"
		},
		"54085": {
			"short": "Ritchie",
			"long": "Ritchie County, WV"
		},
		"54087": {
			"short": "Roane",
			"long": "Roane County, WV"
		},
		"54089": {
			"short": "Summers",
			"long": "Summers County, WV"
		},
		"54091": {
			"short": "Taylor",
			"long": "Taylor County, WV"
		},
		"54093": {
			"short": "Tucker",
			"long": "Tucker County, WV"
		},
		"54095": {
			"short": "Tyler",
			"long": "Tyler County, WV"
		},
		"54097": {
			"short": "Upshur",
			"long": "Upshur County, WV"
		},
		"54099": {
			"short": "Wayne",
			"long": "Wayne County, WV"
		},
		"54101": {
			"short": "Webster",
			"long": "Webster County, WV"
		},
		"54103": {
			"short": "Wetzel",
			"long": "Wetzel County, WV"
		},
		"54105": {
			"short": "Wirt",
			"long": "Wirt County, WV"
		},
		"54107": {
			"short": "Wood",
			"long": "Wood County, WV"
		},
		"54109": {
			"short": "Wyoming",
			"long": "Wyoming County, WV"
		},
		"55000": {
			"short": "WI",
			"long": "Wisconsin"
		},
		"55001": {
			"short": "Adams",
			"long": "Adams County, WI"
		},
		"55003": {
			"short": "Ashland",
			"long": "Ashland County, WI"
		},
		"55005": {
			"short": "Barron",
			"long": "Barron County, WI"
		},
		"55007": {
			"short": "Bayfield",
			"long": "Bayfield County, WI"
		},
		"55009": {
			"short": "Brown",
			"long": "Brown County, WI"
		},
		"55011": {
			"short": "Buffalo",
			"long": "Buffalo County, WI"
		},
		"55013": {
			"short": "Burnett",
			"long": "Burnett County, WI"
		},
		"55015": {
			"short": "Calumet",
			"long": "Calumet County, WI"
		},
		"55017": {
			"short": "Chippewa",
			"long": "Chippewa County, WI"
		},
		"55019": {
			"short": "Clark",
			"long": "Clark County, WI"
		},
		"55021": {
			"short": "Columbia",
			"long": "Columbia County, WI"
		},
		"55023": {
			"short": "Crawford",
			"long": "Crawford County, WI"
		},
		"55025": {
			"short": "Dane",
			"long": "Dane County, WI"
		},
		"55027": {
			"short": "Dodge",
			"long": "Dodge County, WI"
		},
		"55029": {
			"short": "Door",
			"long": "Door County, WI"
		},
		"55031": {
			"short": "Douglas",
			"long": "Douglas County, WI"
		},
		"55033": {
			"short": "Dunn",
			"long": "Dunn County, WI"
		},
		"55035": {
			"short": "Eau Claire",
			"long": "Eau Claire County, WI"
		},
		"55037": {
			"short": "Florence",
			"long": "Florence County, WI"
		},
		"55039": {
			"short": "Fond du Lac",
			"long": "Fond du Lac County, WI"
		},
		"55041": {
			"short": "Forest",
			"long": "Forest County, WI"
		},
		"55043": {
			"short": "Grant",
			"long": "Grant County, WI"
		},
		"55045": {
			"short": "Green",
			"long": "Green County, WI"
		},
		"55047": {
			"short": "Green Lake",
			"long": "Green Lake County, WI"
		},
		"55049": {
			"short": "Iowa",
			"long": "Iowa County, WI"
		},
		"55051": {
			"short": "Iron",
			"long": "Iron County, WI"
		},
		"55053": {
			"short": "Jackson",
			"long": "Jackson County, WI"
		},
		"55055": {
			"short": "Jefferson",
			"long": "Jefferson County, WI"
		},
		"55057": {
			"short": "Juneau",
			"long": "Juneau County, WI"
		},
		"55059": {
			"short": "Kenosha",
			"long": "Kenosha County, WI"
		},
		"55061": {
			"short": "Kewaunee",
			"long": "Kewaunee County, WI"
		},
		"55063": {
			"short": "La Crosse",
			"long": "La Crosse County, WI"
		},
		"55065": {
			"short": "Lafayette",
			"long": "Lafayette County, WI"
		},
		"55067": {
			"short": "Langlade",
			"long": "Langlade County, WI"
		},
		"55069": {
			"short": "Lincoln",
			"long": "Lincoln County, WI"
		},
		"55071": {
			"short": "Manitowoc",
			"long": "Manitowoc County, WI"
		},
		"55073": {
			"short": "Marathon",
			"long": "Marathon County, WI"
		},
		"55075": {
			"short": "Marinette",
			"long": "Marinette County, WI"
		},
		"55077": {
			"short": "Marquette",
			"long": "Marquette County, WI"
		},
		"55078": {
			"short": "Menominee",
			"long": "Menominee County, WI"
		},
		"55079": {
			"short": "Milwaukee",
			"long": "Milwaukee County, WI"
		},
		"55081": {
			"short": "Monroe",
			"long": "Monroe County, WI"
		},
		"55083": {
			"short": "Oconto",
			"long": "Oconto County, WI"
		},
		"55085": {
			"short": "Oneida",
			"long": "Oneida County, WI"
		},
		"55087": {
			"short": "Outagamie",
			"long": "Outagamie County, WI"
		},
		"55089": {
			"short": "Ozaukee",
			"long": "Ozaukee County, WI"
		},
		"55091": {
			"short": "Pepin",
			"long": "Pepin County, WI"
		},
		"55093": {
			"short": "Pierce",
			"long": "Pierce County, WI"
		},
		"55095": {
			"short": "Polk",
			"long": "Polk County, WI"
		},
		"55097": {
			"short": "Portage",
			"long": "Portage County, WI"
		},
		"55099": {
			"short": "Price",
			"long": "Price County, WI"
		},
		"55101": {
			"short": "Racine",
			"long": "Racine County, WI"
		},
		"55103": {
			"short": "Richland",
			"long": "Richland County, WI"
		},
		"55105": {
			"short": "Rock",
			"long": "Rock County, WI"
		},
		"55107": {
			"short": "Rusk",
			"long": "Rusk County, WI"
		},
		"55109": {
			"short": "St. Croix",
			"long": "St. Croix County, WI"
		},
		"55111": {
			"short": "Sauk",
			"long": "Sauk County, WI"
		},
		"55113": {
			"short": "Sawyer",
			"long": "Sawyer County, WI"
		},
		"55115": {
			"short": "Shawano",
			"long": "Shawano County, WI"
		},
		"55117": {
			"short": "Sheboygan",
			"long": "Sheboygan County, WI"
		},
		"55119": {
			"short": "Taylor",
			"long": "Taylor County, WI"
		},
		"55121": {
			"short": "Trempealeau",
			"long": "Trempealeau County, WI"
		},
		"55123": {
			"short": "Vernon",
			"long": "Vernon County, WI"
		},
		"55125": {
			"short": "Vilas",
			"long": "Vilas County, WI"
		},
		"55127": {
			"short": "Walworth",
			"long": "Walworth County, WI"
		},
		"55129": {
			"short": "Washburn",
			"long": "Washburn County, WI"
		},
		"55131": {
			"short": "Washington",
			"long": "Washington County, WI"
		},
		"55133": {
			"short": "Waukesha",
			"long": "Waukesha County, WI"
		},
		"55135": {
			"short": "Waupaca",
			"long": "Waupaca County, WI"
		},
		"55137": {
			"short": "Waushara",
			"long": "Waushara County, WI"
		},
		"55139": {
			"short": "Winnebago",
			"long": "Winnebago County, WI"
		},
		"55141": {
			"short": "Wood",
			"long": "Wood County, WI"
		},
		"56000": {
			"short": "WY",
			"long": "Wyoming"
		},
		"56001": {
			"short": "Albany",
			"long": "Albany County, WY"
		},
		"56003": {
			"short": "Big Horn",
			"long": "Big Horn County, WY"
		},
		"56005": {
			"short": "Campbell",
			"long": "Campbell County, WY"
		},
		"56007": {
			"short": "Carbon",
			"long": "Carbon County, WY"
		},
		"56009": {
			"short": "Converse",
			"long": "Converse County, WY"
		},
		"56011": {
			"short": "Crook",
			"long": "Crook County, WY"
		},
		"56013": {
			"short": "Fremont",
			"long": "Fremont County, WY"
		},
		"56015": {
			"short": "Goshen",
			"long": "Goshen County, WY"
		},
		"56017": {
			"short": "Hot Springs",
			"long": "Hot Springs County, WY"
		},
		"56019": {
			"short": "Johnson",
			"long": "Johnson County, WY"
		},
		"56021": {
			"short": "Laramie",
			"long": "Laramie County, WY"
		},
		"56023": {
			"short": "Lincoln",
			"long": "Lincoln County, WY"
		},
		"56025": {
			"short": "Natrona",
			"long": "Natrona County, WY"
		},
		"56027": {
			"short": "Niobrara",
			"long": "Niobrara County, WY"
		},
		"56029": {
			"short": "Park",
			"long": "Park County, WY"
		},
		"56031": {
			"short": "Platte",
			"long": "Platte County, WY"
		},
		"56033": {
			"short": "Sheridan",
			"long": "Sheridan County, WY"
		},
		"56035": {
			"short": "Sublette",
			"long": "Sublette County, WY"
		},
		"56037": {
			"short": "Sweetwater",
			"long": "Sweetwater County, WY"
		},
		"56039": {
			"short": "Teton",
			"long": "Teton County, WY"
		},
		"56041": {
			"short": "Uinta",
			"long": "Uinta County, WY"
		},
		"56043": {
			"short": "Washakie",
			"long": "Washakie County, WY"
		},
		"56045": {
			"short": "Weston",
			"long": "Weston County, WY"
		},
		"60000": {
			"short": "AS",
			"long": "American Samoa"
		},
		"60010": {
			"short": "Eastern District",
			"long": "Eastern District, AS"
		},
		"60020": {
			"short": "Manu'a District",
			"long": "Manu'a District, AS"
		},
		"60030": {
			"short": "Rose Island",
			"long": "Rose Island, AS"
		},
		"60040": {
			"short": "Swains Island",
			"long": "Swains Island, AS"
		},
		"60050": {
			"short": "Western District",
			"long": "Western District, AS"
		},
		"66000": {
			"short": "GU",
			"long": "Guam"
		},
		"66010": {
			"short": "Guam",
			"long": "Guam, GU"
		},
		"69000": {
			"short": "MP",
			"long": "Northern Mariana Islands"
		},
		"69085": {
			"short": "Northern Islands Municipality",
			"long": "Northern Islands Municipality, MP"
		},
		"69100": {
			"short": "Rota Municipality",
			"long": "Rota Municipality, MP"
		},
		"69110": {
			"short": "Saipan Municipality",
			"long": "Saipan Municipality, MP"
		},
		"69120": {
			"short": "Tinian Municipality",
			"long": "Tinian Municipality, MP"
		},
		"72000": {
			"short": "PR",
			"long": "Puerto Rico"
		},
		"72001": {
			"short": "Adjuntas Municipio",
			"long": "Adjuntas Municipio, PR"
		},
		"72003": {
			"short": "Aguada Municipio",
			"long": "Aguada Municipio, PR"
		},
		"72005": {
			"short": "Aguadilla Municipio",
			"long": "Aguadilla Municipio, PR"
		},
		"72007": {
			"short": "Aguas Buenas Municipio",
			"long": "Aguas Buenas Municipio, PR"
		},
		"72009": {
			"short": "Aibonito Municipio",
			"long": "Aibonito Municipio, PR"
		},
		"72011": {
			"short": "Anasco Municipio",
			"long": "Anasco Municipio, PR"
		},
		"72013": {
			"short": "Arecibo Municipio",
			"long": "Arecibo Municipio, PR"
		},
		"72015": {
			"short": "Arroyo Municipio",
			"long": "Arroyo Municipio, PR"
		},
		"72017": {
			"short": "Barceloneta Municipio",
			"long": "Barceloneta Municipio, PR"
		},
		"72019": {
			"short": "Barranquitas Municipio",
			"long": "Barranquitas Municipio, PR"
		},
		"72021": {
			"short": "Bayamon Municipio",
			"long": "Bayamon Municipio, PR"
		},
		"72023": {
			"short": "Cabo Rojo Municipio",
			"long": "Cabo Rojo Municipio, PR"
		},
		"72025": {
			"short": "Caguas Municipio",
			"long": "Caguas Municipio, PR"
		},
		"72027": {
			"short": "Camuy Municipio",
			"long": "Camuy Municipio, PR"
		},
		"72029": {
			"short": "Canovanas Municipio",
			"long": "Canovanas Municipio, PR"
		},
		"72031": {
			"short": "Carolina Municipio",
			"long": "Carolina Municipio, PR"
		},
		"72033": {
			"short": "Catano Municipio",
			"long": "Catano Municipio, PR"
		},
		"72035": {
			"short": "Cayey Municipio",
			"long": "Cayey Municipio, PR"
		},
		"72037": {
			"short": "Ceiba Municipio",
			"long": "Ceiba Municipio, PR"
		},
		"72039": {
			"short": "Ciales Municipio",
			"long": "Ciales Municipio, PR"
		},
		"72041": {
			"short": "Cidra Municipio",
			"long": "Cidra Municipio, PR"
		},
		"72043": {
			"short": "Coamo Municipio",
			"long": "Coamo Municipio, PR"
		},
		"72045": {
			"short": "Comerio Municipio",
			"long": "Comerio Municipio, PR"
		},
		"72047": {
			"short": "Corozal Municipio",
			"long": "Corozal Municipio, PR"
		},
		"72049": {
			"short": "Culebra Municipio",
			"long": "Culebra Municipio, PR"
		},
		"72051": {
			"short": "Dorado Municipio",
			"long": "Dorado Municipio, PR"
		},
		"72053": {
			"short": "Fajardo Municipio",
			"long": "Fajardo Municipio, PR"
		},
		"72054": {
			"short": "Florida Municipio",
			"long": "Florida Municipio, PR"
		},
		"72055": {
			"short": "Guanica Municipio",
			"long": "Guanica Municipio, PR"
		},
		"72057": {
			"short": "Guayama Municipio",
			"long": "Guayama Municipio, PR"
		},
		"72059": {
			"short": "Guayanilla Municipio",
			"long": "Guayanilla Municipio, PR"
		},
		"72061": {
			"short": "Guaynabo Municipio",
			"long": "Guaynabo Municipio, PR"
		},
		"72063": {
			"short": "Gurabo Municipio",
			"long": "Gurabo Municipio, PR"
		},
		"72065": {
			"short": "Hatillo Municipio",
			"long": "Hatillo Municipio, PR"
		},
		"72067": {
			"short": "Hormigueros Municipio",
			"long": "Hormigueros Municipio, PR"
		},
		"72069": {
			"short": "Humacao Municipio",
			"long": "Humacao Municipio, PR"
		},
		"72071": {
			"short": "Isabela Municipio",
			"long": "Isabela Municipio, PR"
		},
		"72073": {
			"short": "Jayuya Municipio",
			"long": "Jayuya Municipio, PR"
		},
		"72075": {
			"short": "Juana Diaz Municipio",
			"long": "Juana Diaz Municipio, PR"
		},
		"72077": {
			"short": "Juncos Municipio",
			"long": "Juncos Municipio, PR"
		},
		"72079": {
			"short": "Lajas Municipio",
			"long": "Lajas Municipio, PR"
		},
		"72081": {
			"short": "Lares Municipio",
			"long": "Lares Municipio, PR"
		},
		"72083": {
			"short": "Las Marias Municipio",
			"long": "Las Marias Municipio, PR"
		},
		"72085": {
			"short": "Las Piedras Municipio",
			"long": "Las Piedras Municipio, PR"
		},
		"72087": {
			"short": "Loiza Municipio",
			"long": "Loiza Municipio, PR"
		},
		"72089": {
			"short": "Luquillo Municipio",
			"long": "Luquillo Municipio, PR"
		},
		"72091": {
			"short": "Manati Municipio",
			"long": "Manati Municipio, PR"
		},
		"72093": {
			"short": "Maricao Municipio",
			"long": "Maricao Municipio, PR"
		},
		"72095": {
			"short": "Maunabo Municipio",
			"long": "Maunabo Municipio, PR"
		},
		"72097": {
			"short": "Mayaguez Municipio",
			"long": "Mayaguez Municipio, PR"
		},
		"72099": {
			"short": "Moca Municipio",
			"long": "Moca Municipio, PR"
		},
		"72101": {
			"short": "Morovis Municipio",
			"long": "Morovis Municipio, PR"
		},
		"72103": {
			"short": "Naguabo Municipio",
			"long": "Naguabo Municipio, PR"
		},
		"72105": {
			"short": "Naranjito Municipio",
			"long": "Naranjito Municipio, PR"
		},
		"72107": {
			"short": "Orocovis Municipio",
			"long": "Orocovis Municipio, PR"
		},
		"72109": {
			"short": "Patillas Municipio",
			"long": "Patillas Municipio, PR"
		},
		"72111": {
			"short": "Penuelas Municipio",
			"long": "Penuelas Municipio, PR"
		},
		"72113": {
			"short": "Ponce Municipio",
			"long": "Ponce Municipio, PR"
		},
		"72115": {
			"short": "Quebradillas Municipio",
			"long": "Quebradillas Municipio, PR"
		},
		"72117": {
			"short": "Rincon Municipio",
			"long": "Rincon Municipio, PR"
		},
		"72119": {
			"short": "Rio Grande Municipio",
			"long": "Rio Grande Municipio, PR"
		},
		"72121": {
			"short": "Sabana Grande Municipio",
			"long": "Sabana Grande Municipio, PR"
		},
		"72123": {
			"short": "Salinas Municipio",
			"long": "Salinas Municipio, PR"
		},
		"72125": {
			"short": "San German Municipio",
			"long": "San German Municipio, PR"
		},
		"72127": {
			"short": "San Juan Municipio",
			"long": "San Juan Municipio, PR"
		},
		"72129": {
			"short": "San Lorenzo Municipio",
			"long": "San Lorenzo Municipio, PR"
		},
		"72131": {
			"short": "San Sebastian Municipio",
			"long": "San Sebastian Municipio, PR"
		},
		"72133": {
			"short": "Santa Isabel Municipio",
			"long": "Santa Isabel Municipio, PR"
		},
		"72135": {
			"short": "Toa Alta Municipio",
			"long": "Toa Alta Municipio, PR"
		},
		"72137": {
			"short": "Toa Baja Municipio",
			"long": "Toa Baja Municipio, PR"
		},
		"72139": {
			"short": "Trujillo Alto Municipio",
			"long": "Trujillo Alto Municipio, PR"
		},
		"72141": {
			"short": "Utuado Municipio",
			"long": "Utuado Municipio, PR"
		},
		"72143": {
			"short": "Vega Alta Municipio",
			"long": "Vega Alta Municipio, PR"
		},
		"72145": {
			"short": "Vega Baja Municipio",
			"long": "Vega Baja Municipio, PR"
		},
		"72147": {
			"short": "Vieques Municipio",
			"long": "Vieques Municipio, PR"
		},
		"72149": {
			"short": "Villalba Municipio",
			"long": "Villalba Municipio, PR"
		},
		"72151": {
			"short": "Yabucoa Municipio",
			"long": "Yabucoa Municipio, PR"
		},
		"72153": {
			"short": "Yauco Municipio",
			"long": "Yauco Municipio, PR"
		},
		"74000": {
			"short": "UM",
			"long": "U.S. Minor Outlying Islands"
		},
		"74300": {
			"short": "Midway Islands",
			"long": "Midway Islands, UM"
		},
		"78000": {
			"short": "VI",
			"long": "U.S. Virgin Islands"
		},
		"78010": {
			"short": "St. Croix Island",
			"long": "St. Croix Island, VI"
		},
		"78020": {
			"short": "St. John Island",
			"long": "St. John Island, VI"
		},
		"78030": {
			"short": "St. Thomas Island",
			"long": "St. Thomas Island, VI"
		},
		"00000": {
			"short": "United States",
			"long": "United States of America"
		},
		"01000": {
			"short": "AL",
			"long": "Alabama"
		},
		"02000": {
			"short": "AK",
			"long": "Alaska"
		},
		"04000": {
			"short": "AZ",
			"long": "Arizona"
		},
		"05000": {
			"short": "AR",
			"long": "Arkansas"
		},
		"06000": {
			"short": "CA",
			"long": "California"
		},
		"08000": {
			"short": "CO",
			"long": "Colorado"
		},
		"09000": {
			"short": "CT",
			"long": "Connecticut"
		},
		"01003": {
			"short": "Baldwin",
			"long": "Baldwin County, AL"
		},
		"01005": {
			"short": "Barbour",
			"long": "Barbour County, AL"
		},
		"01007": {
			"short": "Bibb",
			"long": "Bibb County, AL"
		},
		"01009": {
			"short": "Blount",
			"long": "Blount County, AL"
		},
		"01011": {
			"short": "Bullock",
			"long": "Bullock County, AL"
		},
		"01013": {
			"short": "Butler",
			"long": "Butler County, AL"
		},
		"01015": {
			"short": "Calhoun",
			"long": "Calhoun County, AL"
		},
		"01017": {
			"short": "Chambers",
			"long": "Chambers County, AL"
		},
		"01019": {
			"short": "Cherokee",
			"long": "Cherokee County, AL"
		},
		"01021": {
			"short": "Chilton",
			"long": "Chilton County, AL"
		},
		"01023": {
			"short": "Choctaw",
			"long": "Choctaw County, AL"
		},
		"01025": {
			"short": "Clarke",
			"long": "Clarke County, AL"
		},
		"01027": {
			"short": "Clay",
			"long": "Clay County, AL"
		},
		"01029": {
			"short": "Cleburne",
			"long": "Cleburne County, AL"
		},
		"01031": {
			"short": "Coffee",
			"long": "Coffee County, AL"
		},
		"01033": {
			"short": "Colbert",
			"long": "Colbert County, AL"
		},
		"01035": {
			"short": "Conecuh",
			"long": "Conecuh County, AL"
		},
		"01037": {
			"short": "Coosa",
			"long": "Coosa County, AL"
		},
		"01039": {
			"short": "Covington",
			"long": "Covington County, AL"
		},
		"01041": {
			"short": "Crenshaw",
			"long": "Crenshaw County, AL"
		},
		"01043": {
			"short": "Cullman",
			"long": "Cullman County, AL"
		},
		"01045": {
			"short": "Dale",
			"long": "Dale County, AL"
		},
		"01047": {
			"short": "Dallas",
			"long": "Dallas County, AL"
		},
		"01049": {
			"short": "DeKalb",
			"long": "DeKalb County, AL"
		},
		"01051": {
			"short": "Elmore",
			"long": "Elmore County, AL"
		},
		"01053": {
			"short": "Escambia",
			"long": "Escambia County, AL"
		},
		"01055": {
			"short": "Etowah",
			"long": "Etowah County, AL"
		},
		"01057": {
			"short": "Fayette",
			"long": "Fayette County, AL"
		},
		"01059": {
			"short": "Franklin",
			"long": "Franklin County, AL"
		},
		"01061": {
			"short": "Geneva",
			"long": "Geneva County, AL"
		},
		"01063": {
			"short": "Greene",
			"long": "Greene County, AL"
		},
		"01065": {
			"short": "Hale",
			"long": "Hale County, AL"
		},
		"01067": {
			"short": "Henry",
			"long": "Henry County, AL"
		},
		"01069": {
			"short": "Houston",
			"long": "Houston County, AL"
		},
		"01071": {
			"short": "Jackson",
			"long": "Jackson County, AL"
		},
		"01073": {
			"short": "Jefferson",
			"long": "Jefferson County, AL"
		},
		"01075": {
			"short": "Lamar",
			"long": "Lamar County, AL"
		},
		"01077": {
			"short": "Lauderdale",
			"long": "Lauderdale County, AL"
		},
		"01079": {
			"short": "Lawrence",
			"long": "Lawrence County, AL"
		},
		"01081": {
			"short": "Lee",
			"long": "Lee County, AL"
		},
		"01083": {
			"short": "Limestone",
			"long": "Limestone County, AL"
		},
		"01085": {
			"short": "Lowndes",
			"long": "Lowndes County, AL"
		},
		"01087": {
			"short": "Macon",
			"long": "Macon County, AL"
		},
		"01089": {
			"short": "Madison",
			"long": "Madison County, AL"
		},
		"01091": {
			"short": "Marengo",
			"long": "Marengo County, AL"
		},
		"01093": {
			"short": "Marion",
			"long": "Marion County, AL"
		},
		"01095": {
			"short": "Marshall",
			"long": "Marshall County, AL"
		},
		"01097": {
			"short": "Mobile",
			"long": "Mobile County, AL"
		},
		"01099": {
			"short": "Monroe",
			"long": "Monroe County, AL"
		},
		"01101": {
			"short": "Montgomery",
			"long": "Montgomery County, AL"
		},
		"01103": {
			"short": "Morgan",
			"long": "Morgan County, AL"
		},
		"01105": {
			"short": "Perry",
			"long": "Perry County, AL"
		},
		"01107": {
			"short": "Pickens",
			"long": "Pickens County, AL"
		},
		"01109": {
			"short": "Pike",
			"long": "Pike County, AL"
		},
		"01111": {
			"short": "Randolph",
			"long": "Randolph County, AL"
		},
		"01113": {
			"short": "Russell",
			"long": "Russell County, AL"
		},
		"01115": {
			"short": "St. Clair",
			"long": "St. Clair County, AL"
		},
		"01117": {
			"short": "Shelby",
			"long": "Shelby County, AL"
		},
		"01119": {
			"short": "Sumter",
			"long": "Sumter County, AL"
		},
		"01121": {
			"short": "Talladega",
			"long": "Talladega County, AL"
		},
		"01123": {
			"short": "Tallapoosa",
			"long": "Tallapoosa County, AL"
		},
		"01125": {
			"short": "Tuscaloosa",
			"long": "Tuscaloosa County, AL"
		},
		"01127": {
			"short": "Walker",
			"long": "Walker County, AL"
		},
		"01129": {
			"short": "Washington",
			"long": "Washington County, AL"
		},
		"01131": {
			"short": "Wilcox",
			"long": "Wilcox County, AL"
		},
		"01133": {
			"short": "Winston",
			"long": "Winston County, AL"
		},
		"02013": {
			"short": "Aleutians East Borough",
			"long": "Aleutians East Borough, AK"
		},
		"02016": {
			"short": "Aleutians West Census Area",
			"long": "Aleutians West Census Area, AK"
		},
		"02020": {
			"short": "Anchorage Municipality",
			"long": "Anchorage Municipality, AK"
		},
		"02050": {
			"short": "Bethel Census Area",
			"long": "Bethel Census Area, AK"
		},
		"02060": {
			"short": "Bristol Bay Borough",
			"long": "Bristol Bay Borough, AK"
		},
		"02068": {
			"short": "Denali Borough",
			"long": "Denali Borough, AK"
		},
		"02070": {
			"short": "Dillingham Census Area",
			"long": "Dillingham Census Area, AK"
		},
		"02090": {
			"short": "Fairbanks North Star Borough",
			"long": "Fairbanks North Star Borough, AK"
		},
		"02100": {
			"short": "Haines Borough",
			"long": "Haines Borough, AK"
		},
		"02105": {
			"short": "Hoonah-Angoon Census Area",
			"long": "Hoonah-Angoon Census Area, AK"
		},
		"02110": {
			"short": "Juneau City and Borough",
			"long": "Juneau City and Borough, AK"
		},
		"02122": {
			"short": "Kenai Peninsula Borough",
			"long": "Kenai Peninsula Borough, AK"
		},
		"02130": {
			"short": "Ketchikan Gateway Borough",
			"long": "Ketchikan Gateway Borough, AK"
		},
		"02150": {
			"short": "Kodiak Island Borough",
			"long": "Kodiak Island Borough, AK"
		},
		"02164": {
			"short": "Lake and Peninsula Borough",
			"long": "Lake and Peninsula Borough, AK"
		},
		"02170": {
			"short": "Matanuska-Susitna Borough",
			"long": "Matanuska-Susitna Borough, AK"
		},
		"02180": {
			"short": "Nome Census Area",
			"long": "Nome Census Area, AK"
		},
		"02185": {
			"short": "North Slope Borough",
			"long": "North Slope Borough, AK"
		},
		"02188": {
			"short": "Northwest Arctic Borough",
			"long": "Northwest Arctic Borough, AK"
		},
		"02195": {
			"short": "Petersburg Census Area",
			"long": "Petersburg Census Area, AK"
		},
		"02198": {
			"short": "Prince of Wales-Hyder Census Area",
			"long": "Prince of Wales-Hyder Census Area, AK"
		},
		"02220": {
			"short": "Sitka City and Borough",
			"long": "Sitka City and Borough, AK"
		},
		"02230": {
			"short": "Skagway Municipality",
			"long": "Skagway Municipality, AK"
		},
		"02240": {
			"short": "Southeast Fairbanks Census Area",
			"long": "Southeast Fairbanks Census Area, AK"
		},
		"02261": {
			"short": "Valdez-Cordova Census Area",
			"long": "Valdez-Cordova Census Area, AK"
		},
		"02270": {
			"short": "Wade Hampton Census Area",
			"long": "Wade Hampton Census Area, AK"
		},
		"02275": {
			"short": "Wrangell City and Borough",
			"long": "Wrangell City and Borough, AK"
		},
		"02282": {
			"short": "Yakutat City and Borough",
			"long": "Yakutat City and Borough, AK"
		},
		"02290": {
			"short": "Yukon-Koyukuk Census Area",
			"long": "Yukon-Koyukuk Census Area, AK"
		},
		"04001": {
			"short": "Apache",
			"long": "Apache County, AZ"
		},
		"04003": {
			"short": "Cochise",
			"long": "Cochise County, AZ"
		},
		"04005": {
			"short": "Coconino",
			"long": "Coconino County, AZ"
		},
		"04007": {
			"short": "Gila",
			"long": "Gila County, AZ"
		},
		"04009": {
			"short": "Graham",
			"long": "Graham County, AZ"
		},
		"04011": {
			"short": "Greenlee",
			"long": "Greenlee County, AZ"
		},
		"04012": {
			"short": "La Paz",
			"long": "La Paz County, AZ"
		},
		"04013": {
			"short": "Maricopa",
			"long": "Maricopa County, AZ"
		},
		"04015": {
			"short": "Mohave",
			"long": "Mohave County, AZ"
		},
		"04017": {
			"short": "Navajo",
			"long": "Navajo County, AZ"
		},
		"04019": {
			"short": "Pima",
			"long": "Pima County, AZ"
		},
		"04021": {
			"short": "Pinal",
			"long": "Pinal County, AZ"
		},
		"04023": {
			"short": "Santa Cruz",
			"long": "Santa Cruz County, AZ"
		},
		"04025": {
			"short": "Yavapai",
			"long": "Yavapai County, AZ"
		},
		"04027": {
			"short": "Yuma",
			"long": "Yuma County, AZ"
		},
		"05001": {
			"short": "Arkansas",
			"long": "Arkansas County, AR"
		},
		"05003": {
			"short": "Ashley",
			"long": "Ashley County, AR"
		},
		"05005": {
			"short": "Baxter",
			"long": "Baxter County, AR"
		},
		"05007": {
			"short": "Benton",
			"long": "Benton County, AR"
		},
		"05009": {
			"short": "Boone",
			"long": "Boone County, AR"
		},
		"05011": {
			"short": "Bradley",
			"long": "Bradley County, AR"
		},
		"05013": {
			"short": "Calhoun",
			"long": "Calhoun County, AR"
		},
		"05015": {
			"short": "Carroll",
			"long": "Carroll County, AR"
		},
		"05017": {
			"short": "Chicot",
			"long": "Chicot County, AR"
		},
		"05019": {
			"short": "Clark",
			"long": "Clark County, AR"
		},
		"05021": {
			"short": "Clay",
			"long": "Clay County, AR"
		},
		"05023": {
			"short": "Cleburne",
			"long": "Cleburne County, AR"
		},
		"05025": {
			"short": "Cleveland",
			"long": "Cleveland County, AR"
		},
		"05027": {
			"short": "Columbia",
			"long": "Columbia County, AR"
		},
		"05029": {
			"short": "Conway",
			"long": "Conway County, AR"
		},
		"05031": {
			"short": "Craighead",
			"long": "Craighead County, AR"
		},
		"05033": {
			"short": "Crawford",
			"long": "Crawford County, AR"
		},
		"05035": {
			"short": "Crittenden",
			"long": "Crittenden County, AR"
		},
		"05037": {
			"short": "Cross",
			"long": "Cross County, AR"
		},
		"05039": {
			"short": "Dallas",
			"long": "Dallas County, AR"
		},
		"05041": {
			"short": "Desha",
			"long": "Desha County, AR"
		},
		"05043": {
			"short": "Drew",
			"long": "Drew County, AR"
		},
		"05045": {
			"short": "Faulkner",
			"long": "Faulkner County, AR"
		},
		"05047": {
			"short": "Franklin",
			"long": "Franklin County, AR"
		},
		"05049": {
			"short": "Fulton",
			"long": "Fulton County, AR"
		},
		"05051": {
			"short": "Garland",
			"long": "Garland County, AR"
		},
		"05053": {
			"short": "Grant",
			"long": "Grant County, AR"
		},
		"05055": {
			"short": "Greene",
			"long": "Greene County, AR"
		},
		"05057": {
			"short": "Hempstead",
			"long": "Hempstead County, AR"
		},
		"05059": {
			"short": "Hot Spring",
			"long": "Hot Spring County, AR"
		},
		"05061": {
			"short": "Howard",
			"long": "Howard County, AR"
		},
		"05063": {
			"short": "Independence",
			"long": "Independence County, AR"
		},
		"05065": {
			"short": "Izard",
			"long": "Izard County, AR"
		},
		"05067": {
			"short": "Jackson",
			"long": "Jackson County, AR"
		},
		"05069": {
			"short": "Jefferson",
			"long": "Jefferson County, AR"
		},
		"05071": {
			"short": "Johnson",
			"long": "Johnson County, AR"
		},
		"05073": {
			"short": "Lafayette",
			"long": "Lafayette County, AR"
		},
		"05075": {
			"short": "Lawrence",
			"long": "Lawrence County, AR"
		},
		"05077": {
			"short": "Lee",
			"long": "Lee County, AR"
		},
		"05079": {
			"short": "Lincoln",
			"long": "Lincoln County, AR"
		},
		"05081": {
			"short": "Little River",
			"long": "Little River County, AR"
		},
		"05083": {
			"short": "Logan",
			"long": "Logan County, AR"
		},
		"05085": {
			"short": "Lonoke",
			"long": "Lonoke County, AR"
		},
		"05087": {
			"short": "Madison",
			"long": "Madison County, AR"
		},
		"05089": {
			"short": "Marion",
			"long": "Marion County, AR"
		},
		"05091": {
			"short": "Miller",
			"long": "Miller County, AR"
		},
		"05093": {
			"short": "Mississippi",
			"long": "Mississippi County, AR"
		},
		"05095": {
			"short": "Monroe",
			"long": "Monroe County, AR"
		},
		"05097": {
			"short": "Montgomery",
			"long": "Montgomery County, AR"
		},
		"05099": {
			"short": "Nevada",
			"long": "Nevada County, AR"
		},
		"05101": {
			"short": "Newton",
			"long": "Newton County, AR"
		},
		"05103": {
			"short": "Ouachita",
			"long": "Ouachita County, AR"
		},
		"05105": {
			"short": "Perry",
			"long": "Perry County, AR"
		},
		"05107": {
			"short": "Phillips",
			"long": "Phillips County, AR"
		},
		"05109": {
			"short": "Pike",
			"long": "Pike County, AR"
		},
		"05111": {
			"short": "Poinsett",
			"long": "Poinsett County, AR"
		},
		"05113": {
			"short": "Polk",
			"long": "Polk County, AR"
		},
		"05115": {
			"short": "Pope",
			"long": "Pope County, AR"
		},
		"05117": {
			"short": "Prairie",
			"long": "Prairie County, AR"
		},
		"05119": {
			"short": "Pulaski",
			"long": "Pulaski County, AR"
		},
		"05121": {
			"short": "Randolph",
			"long": "Randolph County, AR"
		},
		"05123": {
			"short": "St. Francis",
			"long": "St. Francis County, AR"
		},
		"05125": {
			"short": "Saline",
			"long": "Saline County, AR"
		},
		"05127": {
			"short": "Scott",
			"long": "Scott County, AR"
		},
		"05129": {
			"short": "Searcy",
			"long": "Searcy County, AR"
		},
		"05131": {
			"short": "Sebastian",
			"long": "Sebastian County, AR"
		},
		"05133": {
			"short": "Sevier",
			"long": "Sevier County, AR"
		},
		"05135": {
			"short": "Sharp",
			"long": "Sharp County, AR"
		},
		"05137": {
			"short": "Stone",
			"long": "Stone County, AR"
		},
		"05139": {
			"short": "Union",
			"long": "Union County, AR"
		},
		"05141": {
			"short": "Van Buren",
			"long": "Van Buren County, AR"
		},
		"05143": {
			"short": "Washington",
			"long": "Washington County, AR"
		},
		"05145": {
			"short": "White",
			"long": "White County, AR"
		},
		"05147": {
			"short": "Woodruff",
			"long": "Woodruff County, AR"
		},
		"05149": {
			"short": "Yell",
			"long": "Yell County, AR"
		},
		"06001": {
			"short": "Alameda",
			"long": "Alameda County, CA"
		},
		"06003": {
			"short": "Alpine",
			"long": "Alpine County, CA"
		},
		"06005": {
			"short": "Amador",
			"long": "Amador County, CA"
		},
		"06007": {
			"short": "Butte",
			"long": "Butte County, CA"
		},
		"06009": {
			"short": "Calaveras",
			"long": "Calaveras County, CA"
		},
		"06011": {
			"short": "Colusa",
			"long": "Colusa County, CA"
		},
		"06013": {
			"short": "Contra Costa",
			"long": "Contra Costa County, CA"
		},
		"06015": {
			"short": "Del Norte",
			"long": "Del Norte County, CA"
		},
		"06017": {
			"short": "El Dorado",
			"long": "El Dorado County, CA"
		},
		"06019": {
			"short": "Fresno",
			"long": "Fresno County, CA"
		},
		"06021": {
			"short": "Glenn",
			"long": "Glenn County, CA"
		},
		"06023": {
			"short": "Humboldt",
			"long": "Humboldt County, CA"
		},
		"06025": {
			"short": "Imperial",
			"long": "Imperial County, CA"
		},
		"06027": {
			"short": "Inyo",
			"long": "Inyo County, CA"
		},
		"06029": {
			"short": "Kern",
			"long": "Kern County, CA"
		},
		"06031": {
			"short": "Kings",
			"long": "Kings County, CA"
		},
		"06033": {
			"short": "Lake",
			"long": "Lake County, CA"
		},
		"06035": {
			"short": "Lassen",
			"long": "Lassen County, CA"
		},
		"06037": {
			"short": "Los Angeles",
			"long": "Los Angeles County, CA"
		},
		"06039": {
			"short": "Madera",
			"long": "Madera County, CA"
		},
		"06041": {
			"short": "Marin",
			"long": "Marin County, CA"
		},
		"06043": {
			"short": "Mariposa",
			"long": "Mariposa County, CA"
		},
		"06045": {
			"short": "Mendocino",
			"long": "Mendocino County, CA"
		},
		"06047": {
			"short": "Merced",
			"long": "Merced County, CA"
		},
		"06049": {
			"short": "Modoc",
			"long": "Modoc County, CA"
		},
		"06051": {
			"short": "Mono",
			"long": "Mono County, CA"
		},
		"06053": {
			"short": "Monterey",
			"long": "Monterey County, CA"
		},
		"06055": {
			"short": "Napa",
			"long": "Napa County, CA"
		},
		"06057": {
			"short": "Nevada",
			"long": "Nevada County, CA"
		},
		"06059": {
			"short": "Orange",
			"long": "Orange County, CA"
		},
		"06061": {
			"short": "Placer",
			"long": "Placer County, CA"
		},
		"06063": {
			"short": "Plumas",
			"long": "Plumas County, CA"
		},
		"06065": {
			"short": "Riverside",
			"long": "Riverside County, CA"
		},
		"06067": {
			"short": "Sacramento",
			"long": "Sacramento County, CA"
		},
		"06069": {
			"short": "San Benito",
			"long": "San Benito County, CA"
		},
		"06071": {
			"short": "San Bernardino",
			"long": "San Bernardino County, CA"
		},
		"06073": {
			"short": "San Diego",
			"long": "San Diego County, CA"
		},
		"06075": {
			"short": "San Francisco",
			"long": "San Francisco County, CA"
		},
		"06077": {
			"short": "San Joaquin",
			"long": "San Joaquin County, CA"
		},
		"06079": {
			"short": "San Luis Obispo",
			"long": "San Luis Obispo County, CA"
		},
		"06081": {
			"short": "San Mateo",
			"long": "San Mateo County, CA"
		},
		"06083": {
			"short": "Santa Barbara",
			"long": "Santa Barbara County, CA"
		},
		"06085": {
			"short": "Santa Clara",
			"long": "Santa Clara County, CA"
		},
		"06087": {
			"short": "Santa Cruz",
			"long": "Santa Cruz County, CA"
		},
		"06089": {
			"short": "Shasta",
			"long": "Shasta County, CA"
		},
		"06091": {
			"short": "Sierra",
			"long": "Sierra County, CA"
		},
		"06093": {
			"short": "Siskiyou",
			"long": "Siskiyou County, CA"
		},
		"06095": {
			"short": "Solano",
			"long": "Solano County, CA"
		},
		"06097": {
			"short": "Sonoma",
			"long": "Sonoma County, CA"
		},
		"06099": {
			"short": "Stanislaus",
			"long": "Stanislaus County, CA"
		},
		"06101": {
			"short": "Sutter",
			"long": "Sutter County, CA"
		},
		"06103": {
			"short": "Tehama",
			"long": "Tehama County, CA"
		},
		"06105": {
			"short": "Trinity",
			"long": "Trinity County, CA"
		},
		"06107": {
			"short": "Tulare",
			"long": "Tulare County, CA"
		},
		"06109": {
			"short": "Tuolumne",
			"long": "Tuolumne County, CA"
		},
		"06111": {
			"short": "Ventura",
			"long": "Ventura County, CA"
		},
		"06113": {
			"short": "Yolo",
			"long": "Yolo County, CA"
		},
		"06115": {
			"short": "Yuba",
			"long": "Yuba County, CA"
		},
		"08001": {
			"short": "Adams",
			"long": "Adams County, CO"
		},
		"08003": {
			"short": "Alamosa",
			"long": "Alamosa County, CO"
		},
		"08005": {
			"short": "Arapahoe",
			"long": "Arapahoe County, CO"
		},
		"08007": {
			"short": "Archuleta",
			"long": "Archuleta County, CO"
		},
		"08009": {
			"short": "Baca",
			"long": "Baca County, CO"
		},
		"08011": {
			"short": "Bent",
			"long": "Bent County, CO"
		},
		"08013": {
			"short": "Boulder",
			"long": "Boulder County, CO"
		},
		"08014": {
			"short": "Broomfield",
			"long": "Broomfield County, CO"
		},
		"08015": {
			"short": "Chaffee",
			"long": "Chaffee County, CO"
		},
		"08017": {
			"short": "Cheyenne",
			"long": "Cheyenne County, CO"
		},
		"08019": {
			"short": "Clear Creek",
			"long": "Clear Creek County, CO"
		},
		"08021": {
			"short": "Conejos",
			"long": "Conejos County, CO"
		},
		"08023": {
			"short": "Costilla",
			"long": "Costilla County, CO"
		},
		"08025": {
			"short": "Crowley",
			"long": "Crowley County, CO"
		},
		"08027": {
			"short": "Custer",
			"long": "Custer County, CO"
		},
		"08029": {
			"short": "Delta",
			"long": "Delta County, CO"
		},
		"08031": {
			"short": "Denver",
			"long": "Denver County, CO"
		},
		"08033": {
			"short": "Dolores",
			"long": "Dolores County, CO"
		},
		"08035": {
			"short": "Douglas",
			"long": "Douglas County, CO"
		},
		"08037": {
			"short": "Eagle",
			"long": "Eagle County, CO"
		},
		"08039": {
			"short": "Elbert",
			"long": "Elbert County, CO"
		},
		"08041": {
			"short": "El Paso",
			"long": "El Paso County, CO"
		},
		"08043": {
			"short": "Fremont",
			"long": "Fremont County, CO"
		},
		"08045": {
			"short": "Garfield",
			"long": "Garfield County, CO"
		},
		"08047": {
			"short": "Gilpin",
			"long": "Gilpin County, CO"
		},
		"08049": {
			"short": "Grand",
			"long": "Grand County, CO"
		},
		"08051": {
			"short": "Gunnison",
			"long": "Gunnison County, CO"
		},
		"08053": {
			"short": "Hinsdale",
			"long": "Hinsdale County, CO"
		},
		"08055": {
			"short": "Huerfano",
			"long": "Huerfano County, CO"
		},
		"08057": {
			"short": "Jackson",
			"long": "Jackson County, CO"
		},
		"08059": {
			"short": "Jefferson",
			"long": "Jefferson County, CO"
		},
		"08061": {
			"short": "Kiowa",
			"long": "Kiowa County, CO"
		},
		"08063": {
			"short": "Kit Carson",
			"long": "Kit Carson County, CO"
		},
		"08065": {
			"short": "Lake",
			"long": "Lake County, CO"
		},
		"08067": {
			"short": "La Plata",
			"long": "La Plata County, CO"
		},
		"08069": {
			"short": "Larimer",
			"long": "Larimer County, CO"
		},
		"08071": {
			"short": "Las Animas",
			"long": "Las Animas County, CO"
		},
		"08073": {
			"short": "Lincoln",
			"long": "Lincoln County, CO"
		},
		"08075": {
			"short": "Logan",
			"long": "Logan County, CO"
		},
		"08077": {
			"short": "Mesa",
			"long": "Mesa County, CO"
		},
		"08079": {
			"short": "Mineral",
			"long": "Mineral County, CO"
		},
		"08081": {
			"short": "Moffat",
			"long": "Moffat County, CO"
		},
		"08083": {
			"short": "Montezuma",
			"long": "Montezuma County, CO"
		},
		"08085": {
			"short": "Montrose",
			"long": "Montrose County, CO"
		},
		"08087": {
			"short": "Morgan",
			"long": "Morgan County, CO"
		},
		"08089": {
			"short": "Otero",
			"long": "Otero County, CO"
		},
		"08091": {
			"short": "Ouray",
			"long": "Ouray County, CO"
		},
		"08093": {
			"short": "Park",
			"long": "Park County, CO"
		},
		"08095": {
			"short": "Phillips",
			"long": "Phillips County, CO"
		},
		"08097": {
			"short": "Pitkin",
			"long": "Pitkin County, CO"
		},
		"08099": {
			"short": "Prowers",
			"long": "Prowers County, CO"
		},
		"08101": {
			"short": "Pueblo",
			"long": "Pueblo County, CO"
		},
		"08103": {
			"short": "Rio Blanco",
			"long": "Rio Blanco County, CO"
		},
		"08105": {
			"short": "Rio Grande",
			"long": "Rio Grande County, CO"
		},
		"08107": {
			"short": "Routt",
			"long": "Routt County, CO"
		},
		"08109": {
			"short": "Saguache",
			"long": "Saguache County, CO"
		},
		"08111": {
			"short": "San Juan",
			"long": "San Juan County, CO"
		},
		"08113": {
			"short": "San Miguel",
			"long": "San Miguel County, CO"
		},
		"08115": {
			"short": "Sedgwick",
			"long": "Sedgwick County, CO"
		},
		"08117": {
			"short": "Summit",
			"long": "Summit County, CO"
		},
		"08119": {
			"short": "Teller",
			"long": "Teller County, CO"
		},
		"08121": {
			"short": "Washington",
			"long": "Washington County, CO"
		},
		"08123": {
			"short": "Weld",
			"long": "Weld County, CO"
		},
		"08125": {
			"short": "Yuma",
			"long": "Yuma County, CO"
		},
		"09001": {
			"short": "Fairfield",
			"long": "Fairfield County, CT"
		},
		"09003": {
			"short": "Hartford",
			"long": "Hartford County, CT"
		},
		"09005": {
			"short": "Litchfield",
			"long": "Litchfield County, CT"
		},
		"09007": {
			"short": "Middlesex",
			"long": "Middlesex County, CT"
		},
		"09009": {
			"short": "New Haven",
			"long": "New Haven County, CT"
		},
		"09011": {
			"short": "New London",
			"long": "New London County, CT"
		},
		"09013": {
			"short": "Tolland",
			"long": "Tolland County, CT"
		},
		"09015": {
			"short": "Windham",
			"long": "Windham County, CT"
		}
	};

/***/ }
/******/ ]);