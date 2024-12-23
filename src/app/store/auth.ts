import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

export type User = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,    
    role : string
    
}
// Define the initial state for the auth slice
const initialState = {
  user: null as User, // Currently logged in user
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
      state.user = action.payload;
      state.error = null;
      state.status = 'complete';
    },
    // Reset user data, set error message, and status to 'failed' on login failure
    loginUserFailure(state, action) {
      state.user = null;
      state.error = action.payload;
      state.status = 'failed';
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
