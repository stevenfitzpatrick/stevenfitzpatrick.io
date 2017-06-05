import * as types from './types';

export const addFilter = filter => ({
  type: types.ADD_FILTER,
  filter
});

export const removeFilter = filter => ({
  type: types.REMOVE_FILTER,
  filter
});

export const fetchBookmarks = _ => ({
  type: types.BOOKMARKS_FETCH_REQUESTED
});
