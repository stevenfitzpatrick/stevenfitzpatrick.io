import * as types from './types';

export const loadBookmarks = allBookmarks => ({
  type: types.LOAD_BOOKMARKS,
  allBookmarks
});

export const loadTags = tags => ({
  type: types.LOAD_TAGS,
  tags
});

export const addFilter = filter => ({
  type: types.ADD_FILTER,
  filter
});

export const removeFilter = filter => ({
  type: types.REMOVE_FILTER,
  filter
});
