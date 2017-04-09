import { createStore, combineReducers } from 'redux';
import { rootReducer as bookmarks, initialState } from './reducers';

const INITIAL = {
  bookmarks: []
};

const store = combineReducers({ bookmarks });

export default createStore(store, INITIAL);
