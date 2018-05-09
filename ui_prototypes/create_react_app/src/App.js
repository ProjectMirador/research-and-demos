import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import m3core from 'minimal_redux_poc';

class App extends Component {
  render() {
    console.log(m3core)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
