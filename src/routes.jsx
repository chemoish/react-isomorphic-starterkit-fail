import React from 'react';

import { IndexRoute, Route } from 'react-router';

import App from './app';
import Home from './home/home';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
