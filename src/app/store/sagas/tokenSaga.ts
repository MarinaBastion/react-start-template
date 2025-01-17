import { select, takeEvery } from 'redux-saga/effects';
import { tokenActions, tokenSelectors } from '../token';

export function* setToken(action: any): Generator {
  const token = (yield select(tokenSelectors.get)) as string;
  localStorage.setItem('token', token || '');
}

export function* tokenSaga() {
  yield takeEvery(tokenActions.setToken.type, setToken);
}
