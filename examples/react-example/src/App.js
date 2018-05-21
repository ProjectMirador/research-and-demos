import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import m3core from 'minimal_redux_poc';

class App extends Component {
  showManifest(event) {
    event.preventDefault();
    console.log(m3core.store.getState());
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input id="manifestURL" type="text"/>
        <button id="fetchBtn" type="submit" onClick={this.showManifest}>Fetch Manifest</button>
        <pre id="exampleManifest"></pre>
      </div>
    );
  }
}

export default App;
