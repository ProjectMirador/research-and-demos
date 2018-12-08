import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'mirador3-core';
import { App } from './components/App';

const config = require('./mirador-config.json');
/**
 * Default Mirador instantiation
 */
ReactDOM.render(
  <Provider store={store}>
    <App config={config} />
  </Provider>,
  document.getElementById(config.id),
);
