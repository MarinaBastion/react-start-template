import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from './store';
import { AuthResult } from '../types/RegisterTypes';
import { ProfileGetResponse } from '../types/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileThunk, profileThunkSelectors } from './profileThunk';
import { stat } from 'fs';
import { StringDecoder } from 'string_decoder';

// export type User = {
//     id: number,
//     email: string,
//     firstName: string,
//     lastName: string,    
//     role : string
    
// }
// Define the initial state for the auth slice
const initialState = {
  user: null as ProfileGetResponse,
  token: null as string, // Currently logged in user
  error: null as string, // Any error that occurred during login
  status: 'idle', // Status of the login process (idle, pending, complete, failed)
};

// Create the auth slice using createSlice
const authSlice = createSlice({
  name: 'auth', // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer functions to update the state
    // Set the status to 'pending' when login starts
    loginUser(state, action) {
      state.status = 'pending';
    },
    // Update user data and set status to 'complete' on successful login
    loginUserSuccess(state, action) {     
      const profile = action.payload['response']['profile'];
      const token = action.payload['response']['token'];
      state.token = token;      
      state.user = profile
      state.error = null;
      state.status = 'complete';   
      localStorage.setItem('token', state.token || '');   
      localStorage.setItem('user', JSON.stringify(state.user) );   


    },
    // Reset user data, set error message, and status to 'failed' on login failure
    loginUserFailure(state, action) {
      state.token = null;
      state.error = action.payload;
      state.user= null;
      state.status = 'failed';
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

// Export the reducer functions as actions
export const { 
  loginUser, 
  loginUserSuccess, 
  loginUserFailure 
} = authSlice.actions;

export const authSelectors = {
    get: (state: AppState): AppState['auth'] => {
      return state.auth;
    },
  };
// Export the reducer function itself
export const auth = authSlice.reducer;
//export default authSlice.reducer;
