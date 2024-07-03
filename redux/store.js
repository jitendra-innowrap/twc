import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import auth from './Slices/authSlice'
import cart from './Slices/cartSlice'
import wishlist from './Slices/wishlistSlice';

const combinedReducer = combineReducers({
  cart,
  auth,
  wishlist
});

const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            // cart: {
                
            // },
            // wishlist:{
              
            // },
            // auth: {

            // }
        }
        return nextState;
    } else {
    return combinedReducer(state, action)
  }
}

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });