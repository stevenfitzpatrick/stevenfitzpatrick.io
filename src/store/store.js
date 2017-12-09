import { createStore } from 'unistore';

const store = createStore({
  bookmarks: {
    list: [],
    tags: {},
    filter: ''
  },
  blogs: []
});

export default store;
