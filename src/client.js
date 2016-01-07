import 'babel-polyfill';

import React from 'react';

import { createHistory } from 'history';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ReduxRouter, reduxReactRouter, routerStateReducer } from 'redux-router';
import { render } from 'react-dom';

import routes from './routes';

const store = reduxReactRouter({ createHistory })(createStore)(combineReducers({
  router: routerStateReducer
}));

const component = (
  <Provider store={store} key="provider">
    <ReduxRouter routes={routes} />
  </Provider>
);

render(component, document.getElementById('app'));
