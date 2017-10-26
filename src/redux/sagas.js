import { fork, all } from 'redux-saga/effects';
import favouriteSaga from '../components/favourites/sagas';
import writingsSaga from '../components/writing/sagas';

export default function* root() {
  yield all([fork(favouriteSaga), fork(writingsSaga)]);
}
