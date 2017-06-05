import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { bookmarksReducer as bookmarks } from './reducers';
import favouriteSaga from '../components/favourites/sagas';

const INITIAL = {
  bookmarks: {
    list: [],
    tags: {},
    filter: ''
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

const store = combineReducers({ bookmarks });

export default createStore(store, INITIAL, composedMiddleware);
/* eslint-enable */

// Run Saga Middlware
sagaMiddleware.run(favouriteSaga);
