import { takeLatest, put, call } from 'redux-saga/effects';
import { loginUser, loginUserSuccess, loginUserFailure } from '../auth';
import { tokenActions, tokenSelectors } from '../token';
import { authenticateUser ,getProfile} from '../../services/auth.service';
import { useSelector } from 'react-redux';
import { AuthResult } from 'src/app/types/RegisterTypes';
import { ProfileGetResponse, ProfileResponse } from 'src/app/types/Profile';
import { Errors } from 'src/app/types/ResponseErrors';

// Saga to handle user login
export function* handleLogin(action: any) {
  try {
    const { email, password } = action.payload;
    // Call the authenticateUser API function with the username and password
    const response:ProfileResponse | Errors = yield call(authenticateUser,email, password);
    if (!response)  throw new Error("User is not found!")
      
      //const profile :ProfileResponse = yield call(getProfile,token.token);  
    // Dispatch the loginUserSuccess action with the user data
    if ( "errors" in  response )
    { 
      yield put(loginUserFailure(response["errors"][0].message));
    }
    else
      yield put(loginUserSuccess({response}));
   // yield put(tokenActions.setToken(token.token));
   
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

