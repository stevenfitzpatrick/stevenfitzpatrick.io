import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getWritings } from '../../clients/api';

export function* fetchWritings(action) {
  try {
    const writings = yield call(getWritings, {});
    yield put({
      type: 'WRITINGS_FETCH_SUCCEEDED',
      payload: { writings }
    });
  } catch (e) {
    yield put({ type: 'WRITINGS_FETCH_FAILURE', message: e.message });
  }
}

function* WritingsSaga() {
  yield all([takeEvery('WRITINGS_FETCH_REQUESTED', fetchWritings)]);
}

export default WritingsSaga;
