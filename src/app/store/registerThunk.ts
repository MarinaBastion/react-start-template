import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState, ExtraParams } from './store';
import { SignUpBody } from '../types/RegisterTypes';
import { ErrorItem, Errors, Profile,SuccessRegisterData } from '../types/ResponseErrors';

export const fetchRegisterThunk = createAsyncThunk('registerThunk/fetchRegister', async (body: SignUpBody , thunkAPI) => {
   const {email, password, commandId} = body; 
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}signup`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({email, password, commandId})
  })
  .then((res) => 
    res.json());
  return response;
});

export const initialState: {
  resp: ErrorItem[] ;
  data: SuccessRegisterData;
  error: Error;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
} = {
  resp: null,
  data: null,
  status: 'idle',
  error: null,
};

const registerThunkSlice = createSlice({
  name: 'registerThunk',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRegisterThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegisterThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if ('errors' in action.payload) {
            state.resp = action.payload["errors"]
        //state.resp.push(...action.payload);
        }
        else{
            state.data = action.payload
        }
      })
      .addCase(fetchRegisterThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error as Error;
      });
  },
});
export const registerThunkActions = registerThunkSlice.actions;

export const registerThunkSelectors = {
  get: (state: AppState): AppState['registerThunk'] => state.registerThunk,
};

export const registerThunk = registerThunkSlice.reducer;
