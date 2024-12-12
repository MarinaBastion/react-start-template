import { takeLatest, put, call } from 'redux-saga/effects';
import { loginUser, loginUserSuccess, loginUserFailure, User } from '../auth';
import { tokenActions, tokenSelectors } from '../token';
import { authenticateUser } from '../../services/auth.service';
import { useSelector } from 'react-redux';

// Saga to handle user login
export function* handleLogin(action: any) {
  try {
    const { email, password } = action.payload;
    // Call the authenticateUser API function with the username and password
    const user : User = yield call(authenticateUser,email, password);
    if (!user)  throw new Error("User is not found!")
    // Dispatch the loginUserSuccess action with the user data
    yield put(loginUserSuccess(user));
    yield put(tokenActions.gen());
   
  } catch (error) {
    // If there is an error, dispatch the loginUserFailure action with the error message
    yield put(loginUserFailure(error.message));
  }
}

// Watcher saga
export function* authSaga() {
  // Listen for the loginUser action and call the handleLogin saga when dispatched
  yield takeLatest(loginUser.type, handleLogin);
}

export default authSaga;