import Express from 'express';
import qs from 'query-string';
import React from 'react';

import { createMemoryHistory } from 'history';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, reduxReactRouter } from 'redux-router/server';
import { ReduxRouter, routerStateReducer } from 'redux-router';
import { renderToString } from 'react-dom/server';

import routesContainer from './routes';

import Html from './html';

const app = new Express();
const port = 8000;

let routes = routesContainer;

function getMarkup(store) {
  const component = (
    <Provider store={store} key="provider">
      <ReduxRouter />
    </Provider>
  );

  return `
  <!doctype html>
  <html class="no-js" lang="en-us">

  <head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <!-- Place favicon.ico in the root directory -->
  </head>

  <body>
  <div id="app">${renderToString(component)}</div>

  <script src="http://localhost:8080/build/bundle.js"></script>
  </body>

  </html>
`;

  return '<!doctype html>\n' + renderToString(<Html component={component} state={store.getState()} />);
}

app.use(function (req, res) {
  const store = reduxReactRouter({ routes, createHistory: createMemoryHistory })(createStore)(combineReducers({
    router: routerStateReducer
  }));

  const query = qs.stringify(req.query);
  const url  = req.path + (query.length ? '?' + query : '');

  store.dispatch(match(url, (error, redirectLocation, routerState) => {
    if (error) {
      console.error('Router error:', error);
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!routerState) {
      res.status(400).send('Not Found');
    } else {
      res.status(200).send(getMarkup(store));
    }
  }));
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

if (module.hot) {
  console.log('[HMR] Server listening');

  module.hot.accept('./routes', () => {
    routes = require('./routes');
  });
}
