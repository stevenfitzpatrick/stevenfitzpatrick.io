import * as types from './types';

export const bookmarksReducer = (state = {}, action) => {
  switch (action.type) {
    case types.BOOKMARKS_FETCH_SUCCEEDED:
      return {
        ...state,
        list: [...action.bookmarks],
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
