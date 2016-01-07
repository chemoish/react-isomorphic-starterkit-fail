import React, { Component } from 'react';

import { renderToString } from 'react-dom/server';

export default class Html extends Component {
  render() {
    const {
      component,
      state
    } = this.props;

    const content = component ? renderToString(component) : '';

    return (
      <html className="no-js" lang="en">

      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>React Isomorphic Starterkit Fail</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        {/* Place favicon.ico in the root directory */}
      </head>

      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />

        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)};` }} />
        <script src="bundle.js"></script>
      </body>

      </html>
    );
  }
}
