import { mapObjectToArray, countKeys, getTags } from '../../utils/helpers';

export default store => ({
  async fetchBookmarks(state) {
    const res = await fetch('https://stevenfitzpatrick-5181b.firebaseio.com/favourites.json');
    let bookmarks = await res.json();
    bookmarks = mapObjectToArray(bookmarks).reverse();
    const tags = countKeys(getTags(bookmarks));
    store.setState({ bookmarks: { ...state.bookmarks, list: [...bookmarks], tags: { ...tags } } });
  },

  addFilter: ({ bookmarks }, filter) => store.setState({ bookmarks: { ...bookmarks, filter } }),

  removeFilter: ({ bookmarks }, filter) =>
    store.setState({ bookmarks: { ...bookmarks, filter: '' } })
});
