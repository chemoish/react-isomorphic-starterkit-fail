import React from 'react';

import { IndexRoute, Route } from 'react-router';

import App from './app';
import Home from './home/home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
