import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'mirador3-core';
import { App } from './components/App';

/**
 * Default Mirador distribution instantiation
 */
export default function Mirador(config) {
  ReactDOM.render(
    <Provider store={store}>
      <App config={config} />
    </Provider>,
    document.getElementById(config.id),
  );
}
