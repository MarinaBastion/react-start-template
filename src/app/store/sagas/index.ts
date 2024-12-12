import { all } from 'redux-saga/effects';
import { tokenSaga } from '../sagas/tokenSaga';
import { authSaga } from '../sagas/authSaga';
import bucketSaga from './bucketSaga';
export function* sagas() {
  yield all([tokenSaga(),authSaga(),bucketSaga() ]);
}
