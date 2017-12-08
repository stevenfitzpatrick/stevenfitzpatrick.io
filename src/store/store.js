import { createStore } from 'unistore';

let store = createStore({
  bookmarks: {
    list: [],
    tags: {},
    filter: ''
  },
  blogs: []
});

export default store;
