import * as types from './types';

export const bookmarksReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_BOOKMARKS:
      return {
        ...state,
        list: [...action.allBookmarks]
      };
    case types.LOAD_TAGS:
      return {
        ...state,
        tags: { ...action.tags }
      };
    case types.ADD_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case types.REMOVE_FILTER:
      return {
        ...state,
        filter: ''
      };
    default:
      return state;
  }
};
