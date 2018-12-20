import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import deepmerge from 'deepmerge';
import App from './components/App';
import { actions, store } from './store';
import settings from './config/settings';
import './styles/index.scss';

/**
 * Default MiradorViewer instantiation
 */
class MiradorViewer {
  /**
   * constructor
   *
   * @param  {Object} config
   * @return {Object}
   */
  constructor(config) {
    const action = actions.setConfig(deepmerge(settings, config));
    store.dispatch(action);
    this.actions = actions;
    this.store = store;
    this.registerPlugins();
    ReactDOM.render(
      <Provider store={store}>
        <App config={config} />
      </Provider>,
      document.getElementById(config.id),
    );
  }

  /**
   * registerPlugins
   */
  registerPlugins() {
    const { config } = this.store.getState();
    const { plugins } = config;
    const that = this;
    plugins.forEach((plugin) => {
      if (!window[plugin]) {
        console.log(`${plugin} plugin is not available`);
        return;
      }
      // Should every MiradorViewer component do something similar?
      window[plugin].components.forEach((component) => {
        if (component.parent === 'global') component.init(that);
      });
    });
  }
}

const exports = {
  // Other components/classes can be exported here for people who want to customize
  MiradorViewer,
};

export default exports;
