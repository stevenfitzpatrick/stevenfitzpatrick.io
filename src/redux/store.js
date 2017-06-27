import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { bookmarksReducer as bookmarks } from './reducers';
import home from './modules/home';
import writings from './modules/writings';

import Sagas from './sagas';

const INITIAL = {
  bookmarks: {
    list: [],
    tags: {},
    filter: ''
  },
  home: {
    displayShowMe: false
  },
  writings: {
    list: []
  }
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composedMiddleware = process.env.NODE_ENV === 'development'
  ? compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : applyMiddleware(sagaMiddleware);

const store = combineReducers({ bookmarks, home, writings });

export default createStore(store, INITIAL, composedMiddleware);
/* eslint-enable */
// Run Saga Middlware
sagaMiddleware.run(Sagas);
