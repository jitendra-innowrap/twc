// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, deleteFromCart, getCartList } from '../../util/api';

const INIT_LOCALSTORAGE = 'cart/INIT_LOCALSTORAGE';

// Async thunks for API calls
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await getCartList();
  return response;
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (product) => {
  const response = await addToCart(product);
  return response.data;
});

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (product) => {
  const response = await deleteFromCart(product);
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartCount: 0,
    cartDetails: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    initLocalStorage: (state, action) => {
      const { cart } = action.payload;
      state.cartItems = cart.cart_product || [{},{},{}];
      state.cartCount = cart.cart_product_count || 0;
      state.cartDetails = cart.bill_details || {};
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.cart_product;
        state.cartCount = action.payload.cart_product_count;
        state.cartDetails = action.payload.bill_details;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // addItemToCart
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.items;
        state.cartCount = action.payload.count;
        state.cartDetails = action.payload.details;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // removeItemFromCart
      .addCase(removeItemFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.items;
        state.cartCount = action.payload.count;
        state.cartDetails = action.payload.details;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { initLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
