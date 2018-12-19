import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from './components/App';
import { actions, store } from './store';
import settings from './config/settings';
import './styles/index.scss';

/**
 * Default Mirador instantiation
 */
const Mirador = function(config) {
  const viewer = {
    actions,
    store,
  };
  const action = actions.setConfig(deepmerge(settings, config));
  store.dispatch(action);

  Object.keys(Mirador.plugins).forEach((plugin)=>{
    Mirador.plugins[plugin].components.forEach((component)=>{
      if (component.parent === 'global') component.init(viewer);
    });
  });

  ReactDOM.render(
    <Provider store={store}>
      <App config={config} />
    </Provider>,
    document.getElementById(config.id),
  );

  return viewer;
}

Mirador.plugins = {};

export default Mirador
