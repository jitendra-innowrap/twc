import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, deleteFromCart, getCartList, selectShippingAddress, selectBillingAddress } from '../../util/api';
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
  toast.success("Removed from Cart!", {
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

export const setShippingAddress = createAsyncThunk('cart/setShippingAddress', async (address) => {
  const response = await selectShippingAddress(address);
  console.log('response from thunk setShippingAddress', response.data)
  toast.success("Shipping Address Updated!", {
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

export const setBillingAddress = createAsyncThunk('cart/setBillingAddress', async (address) => {
  const response = await selectBillingAddress(address);
  console.log('response from thunk setBillingAddress', response.data)
  toast.success("Billing Address Updated!", {
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
    defaultAddress: null,
    shippingAddress: null,
    billingAddress: null,
    gst_number:"",
    companyName:"",
    couponCode:"",
    status: 'idle',
    error: null,
  },
  reducers: {
    initLocalStorage: (state, action) => {
      const { cart } = action.payload;
      state.cartItems = cart.cart_product || [];
      state.cartCount = cart.cart_product_count || 0;
      state.cartDetails = cart.bill_details || {};
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
      state.cartDetails = {};
    },
    updateGst:(state, action) =>{
      state.gst_number = action.payload.gst_number;
      state.companyName = action.payload.companyName;
    }
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
        state.shippingAddress = action.payload.shipping_address?.[0] || state.defaultAddress;
        state.billingAddress = action.payload.billing_address?.[0] || state.defaultAddress;
        state.couponCode = action.payload?.coupon_data?.code || "";
        state.gst_number = action.payload?.gst_number || "";
        state.companyName = action.payload?.company_name || "";
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
      })
      // setShippingAddress
      .addCase(setShippingAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setShippingAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shippingAddress = action.payload.shipping_address?.[0] || {};
      })
      .addCase(setShippingAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // setBillingAddress
      .addCase(setBillingAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setBillingAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.billingAddress = action.payload.billing_address?.[0] || {};
      })
      .addCase(setBillingAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { initLocalStorage, emptyCart, updateGst } = cartSlice.actions;
export default cartSlice.reducer;