import * as types from './types';

export const rootReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_BOOKMARKS:
      return [...state, ...action.allBookmarks];
    default:
      return state;
  }
};
