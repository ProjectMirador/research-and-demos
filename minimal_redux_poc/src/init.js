import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from './components/App';
import createRootReducer from './reducers/index';
import { store, actions } from './store';
import settings from './config/settings';
import './styles/index.scss';

/**
 * Default Mirador instantiation
 */
export default function (config) {
  [].concat(...Object.values(window.Mirador.plugins).map(plugin => plugin.reducers))
    .forEach(pluginReducer => store.pluginReducers[name] = pluginReducer);

  store.replaceReducer(createRootReducer(store.pluginReducers));

  const viewer = {
    actions: actions,
    store: store,
  };

  const action = actions.setConfig(deepmerge(settings, config));
  store.dispatch(action);

  ReactDOM.render(
    <Provider store={store}>
      <App config={config} />
    </Provider>,
    document.getElementById(config.id),
  );

  return viewer;
}
