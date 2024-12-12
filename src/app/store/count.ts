import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './store';
import { stat } from 'fs';

export type ItemCount = {
  id: number,
  count: number
}
const initialState = {
  counts: [] as ItemCount[]
};

const countSlice = createSlice({
  name: 'count',
  initialState: initialState,
  reducers: {
    increase: (state, action) => { 
      var index = state.counts.indexOf(state.counts.find(c => c.id == action.payload.id));
      if (index > -1){
        state.counts[index].count += 1;
      }
      else {
        state.counts.push({id: action.payload.id, count: 1})
      }
    },
    decrease: (state, action) =>  { 
      debugger;
      var index = state.counts.indexOf(state.counts.find(c => c.id == action.payload.id));
      if (index > -1){
        if ( state.counts[index].count > 0) 
        {
            state.counts[index].count -= 1 
            state.counts[index].count == 0 ? state.counts.splice(index,1) : {}  
        }
        else          
        {
          state.counts.splice(index,1);             
        }

      }
    },
  },
});
export const { increase, decrease } = countSlice.actions;

export const countSelectors = {
  get: (state: AppState): AppState['count'] => {
    console.log('countSelectors get');
    return state.count;
  },
};

export const count = countSlice.reducer;
