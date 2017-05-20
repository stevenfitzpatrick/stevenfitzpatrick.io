import { createStore, combineReducers } from 'redux';
import {
  rootReducer as bookmarks,
  tagsReducer as tags,
  filtersReducer as filters,
  initialState
} from './reducers';

const INITIAL = {
  bookmarks: [],
  tags: [],
  filters: []
};

const store = combineReducers({ bookmarks, tags, filters });

export default createStore(store, INITIAL);
