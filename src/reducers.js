import * as types from './types';

export const rootReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_BOOKMARKS:
      return [...state, ...action.allBookmarks];
    default:
      return state;
  }
};

export const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_TAGS:
      return [...state, ...action.tags];
    default:
      return state;
  }
};

export const filtersReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_FILTER:
      return [...state, action.filter];
    case types.REMOVE_FILTER: {
      let index = state.findIndex(item => item === action.filter);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    default:
      return state;
  }
};
