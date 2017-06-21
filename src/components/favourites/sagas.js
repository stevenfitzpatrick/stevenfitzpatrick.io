import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getBookmarks } from '../../clients/api';

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

export function* fetchBookmarks(action) {
  try {
    let bookmarks = yield call(getBookmarks, {});
    bookmarks = mapObjectToArray(bookmarks).reverse();
    const tags = reduceTags(getTags(bookmarks));
    yield put({
      type: 'BOOKMARKS_FETCH_SUCCEEDED',
      payload: { bookmarks, tags }
    });
  } catch (e) {
    yield put({ type: 'BOOKMARKS_FETCH_FAILURE', message: e.message });
  }
}

function* favouriteSaga() {
  yield takeEvery('BOOKMARKS_FETCH_REQUESTED', fetchBookmarks);
}

export default favouriteSaga;
