import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { actions, store } from 'mirador3-core';
import deepmerge from 'deepmerge';
import settings from './config/settings';
import { App } from './components/App';

const config = require('./config/mirador-config.json');

const action = actions.setConfig(deepmerge(settings, config));
store.dispatch(action);
/**
 * Default Mirador instantiation
 */
ReactDOM.render(
  <Provider store={store}>
    <App config={config} />
  </Provider>,
  document.getElementById(config.id),
);
