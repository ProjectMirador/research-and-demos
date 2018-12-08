import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'mirador3-core'
import { App } from 'mirador3-app-base';

require("./index.scss");

const config = {
  "id" : "mirador"
};

ReactDOM.render(
  <Provider store={store}>
    <App config={config} />
  </Provider>,
  document.getElementById(config.id),
);
