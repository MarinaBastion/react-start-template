import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { count, countSelectors } from './count';
import { put } from 'redux-saga/effects';

export type ProductBucket = {
    id: string
    price: number
    photo: string
    name: string
    category_name: string
    description: string
    caption?: string
    
}
// Define the initial state for the auth slice
const initialState = {
  products: JSON.parse(localStorage.getItem("products")) as ProductBucket[] ?? []
};

// Create the bucketList slice using createSlice
const bucketListSlice = createSlice({
  name: 'bucketList', // Slice name
  initialState, // Initial state
  reducers: {
    
    deleteFromBucket(state, action) {
      // let ls =  localStorage.getItem("products");
      // let products : ProductBucket[] = JSON.parse(ls);
      // state.products = products;
        const index = state.products.indexOf(state.products.find(c => c.id == action.payload.id));
        if (index > -1) { 
            state.products.splice(index, 1); 
            localStorage.setItem('products', JSON.stringify(state.products) )
        }
    },
    addToBucket(state, action) {
      //state.products.push(action.payload)
        // let ls =  localStorage.getItem("products");
        // let products : ProductBucket[] = JSON.parse(ls);
        // state.products = products;
        const index = state.products.indexOf(state.products.find(c => c.id == action.payload.id));
        (index < 0) ? state.products.push(action.payload) : {};
        localStorage.setItem('products', JSON.stringify(state.products) )
    },
    
  },
});

// Export the reducer functions as actions
export const { 
  deleteFromBucket,
  addToBucket 
} = bucketListSlice.actions;

export const bucketListSelectors = {
    get: (state: AppState): AppState['bucketList'] => {
      return state.bucketList;
    },
  };
// Export the reducer function itself
export const bucketList = bucketListSlice.reducer;
//export default authSlice.reducer;
