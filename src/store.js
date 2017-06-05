import { createStore, combineReducers } from 'redux';
import { bookmarksReducer as bookmarks } from './reducers';

const INITIAL = {
  bookmarks: {
    list: [],
    tags: {},
    filter: ''
  }
};

const store = combineReducers({ bookmarks });
/* eslint-disable no-underscore-dangle */
export default createStore(
  store,
  INITIAL,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
