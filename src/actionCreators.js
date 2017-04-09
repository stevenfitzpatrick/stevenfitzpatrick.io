import * as types from './types';

export const loadBookmarks = allBookmarks => ({
  type: types.LOAD_BOOKMARKS,
  allBookmarks
});
