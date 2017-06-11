import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

const mapObjectToArray = object =>
  Object.keys(object).reduce((list, item) => [...list, object[item]], []);

/**
 * Returns list of tags sorted
 */
const getTags = bookmarks => {
  const tags = bookmarks.map(item => [...item.tags]).sort();
  return [].concat(...tags);
};

const reduceTags = tags =>
  tags.reduce((prev, next) => {
    if (prev[next]) {
      prev[next].count++;
    } else {
      prev[next] = {
        text: next,
        count: 1
      };
    }

    return prev;
  }, {});

function* fetchBookmarks(action) {
  try {
    let bookmarks = yield fetch(
      'https://stevenfitzpatrick-5181b.firebaseio.com/favourites.json'
    ).then(response => response.json());
    bookmarks = mapObjectToArray(bookmarks).reverse();
    const tags = reduceTags(getTags(bookmarks));
    yield put({ type: 'BOOKMARKS_FETCH_SUCCEEDED', bookmarks, tags });
  } catch (e) {
    yield put({ type: 'BOOKMARKS_FETCH_FAILURE', message: e.message });
  }
}

function* favouriteSaga() {
  yield takeEvery('BOOKMARKS_FETCH_REQUESTED', fetchBookmarks);
}

export default favouriteSaga;
