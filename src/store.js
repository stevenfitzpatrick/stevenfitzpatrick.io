import { createStore } from 'redux';

let ACTIONS = {
  LOAD_BOOKMARKS: ({ bookmarks, ...state }, { allBookmarks }) => ({
    bookmarks: [...bookmarks, ...allBookmarks],
    ...state
  })
};

const INITIAL = {
  bookmarks: []
};

export default createStore(
  (state, action) =>
    action && ACTIONS[action.type]
      ? ACTIONS[action.type](state, action)
      : state,
  INITIAL
);
