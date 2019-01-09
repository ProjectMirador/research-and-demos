// Topics for understanding
// redux modules for nested stores
// state normalisation
// (normalizer library)

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers/index';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export default function configureStore(pluginReducers) {
  const store = createStore(
    createRootReducer(pluginReducers),
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
  store.asyncReducers = {};
  return store;
}
