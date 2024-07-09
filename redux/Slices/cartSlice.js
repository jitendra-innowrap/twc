// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, deleteFromCart, getCartList } from '../../util/api';
import { Bounce, toast } from 'react-toastify';

const INIT_LOCALSTORAGE = 'cart/INIT_LOCALSTORAGE';

// Async thunks for API calls
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await getCartList();
  console.log('response from thunk', response)
  return response;
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (product) => {
  const response = await addToCart(product);
  console.log('response from thunk add', response.data)
  toast.success("Added to Cart!", {
    position: "bottom-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
  return response.data;
});

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (product) => {
  const response = await deleteFromCart(product);
  console.log('response from thunk remove', response.data)
  toast.success("Removed to Cart!", {
    position: "bottom-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartCount: 0,
    cartDetails: {},
    defaultAddress:null,
    shippingAddress:null,
    billingAddress:null,
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
    emptyCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
      state.cartDetails = {};
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
        state.cartItems = action.payload.cart_product || [];
        state.cartCount = action.payload.cart_product_count || 0;
        state.cartDetails = action.payload.bill_details || {};
        state.defaultAddress = action.payload.user_address?.[0] || {};
        if(action.payload.billing_address?.[0]){
          state.billingAddress = action.payload.billing_address?.[0] || {};
        }else{
          state.billingAddress = action.payload.user_address?.[0] || {};
        }
        if(action.payload.shipping_address?.[0]){
          state.shippingAddress = action.payload.shipping_address?.[0] || {};
        }else{
          state.shippingAddress = action.payload.user_address?.[0] || {};
        }
        
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
        state.cartItems = action.payload.cart_product || [];
        state.cartCount = action.payload.cart_product_count || 0;
        state.cartDetails = action.payload.bill_details || {};
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
        state.cartItems = action.payload.cart_product || [];
        state.cartCount = action.payload.cart_product_count || 0;
        state.cartDetails = action.payload.bill_details || {};
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { initLocalStorage, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
