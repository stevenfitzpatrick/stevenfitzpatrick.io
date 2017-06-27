import { fork, all } from 'redux-saga/effects';
import favouriteSaga from '../components/favourites/sagas';
import writingsSaga from '../components/writing/sagas';

const sagas = [...favouriteSaga, ...writingsSaga];

export default function* root() {
  yield all([fork(favouriteSaga), fork(writingsSaga)]);
}
