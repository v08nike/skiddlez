import { applyMiddleware, createStore, compose as reduxCompose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers';
import rootSaga from './sagas';
import history from './history';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

let compose = reduxCompose;

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger'); // eslint-disable-line global-require
  middlewares.push(logger);

  // enable Redux Devtools in development
  // https://github.com/zalmoxisus/redux-devtools-extension
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined') {
    compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
}

export default createStore(rootReducer, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);
