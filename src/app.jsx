import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>React Isomorphic Starterkit Fail</h1>

        <main>{this.props.children}</main>
      </div>
    );
  }
}
