import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpBody, AuthResult } from "../types/RegisterTypes"


const initialState: SignUpBody = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  email: null,
  password: null,
  commandId : null

}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    userRegister(state, action: PayloadAction<SignUpBody>) {
      const { email, password, commandId } = action.payload;

    },
  }
})

export const { userRegister } = registerSlice.actions

//export const selectCurrentUsername = (state: RootState) => state.auth.username

export const register = registerSlice.reducer