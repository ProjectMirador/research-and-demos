import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import { actions, store } from './store';
import settings from './config/settings';
import App from './components/App';
import './styles/index.scss';

const config = {
  id: 'mirador',
};

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
