import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState, ExtraParams } from './store';
import { ProfileGetResponse } from '../types/Profile';
import { ErrorItem, Errors, Profile,SuccessRegisterData } from '../types/ResponseErrors';

export const fetchProfileThunk = createAsyncThunk('profileThunk/fetchProfile', async (token: string  , thunkAPI) => {
 
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}profile`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => 
    res.json());
  return response;
});

export const initialState: {
  resp: ErrorItem[] ;
  data: ProfileGetResponse;
  error: Error;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
} = {
  resp: null,
  data: null,
  status: 'idle',
  error: null,
};

const profileThunkSlice = createSlice({
  name: 'profileThunk',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfileThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if ('errors' in action.payload) {
            state.resp = action.payload["errors"]
        //state.resp.push(...action.payload);
        }
        else{
            state.data = action.payload
        }
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error as Error;
      });
  },
});
export const profuleThunkActions = profileThunkSlice.actions;

export const profileThunkSelectors = {
  get: (state: AppState): AppState['profileThunk'] => state.profileThunk,
};

export const profileThunk = profileThunkSlice.reducer;
