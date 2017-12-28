import createStore from 'unistore';

const store = createStore({
  bookmarks: {
    list: [],
    tags: {},
    filter: ''
  },
  blogs: [],
  github: {
    commit: null,
    error: false,
    loading: true
  }
});

export default store;
