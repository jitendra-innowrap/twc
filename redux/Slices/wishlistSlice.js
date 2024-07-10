// wishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToWishlist, getWishlistList } from '../../util/api';
import { Bounce, toast } from 'react-toastify';

const INIT_LOCALSTORAGE = 'wishlist/INIT_LOCALSTORAGE';

// Async thunks for API calls
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
  const response = await getWishlistList();
  console.log('response from thunk', response)
  return response;
});

export const addItemToWishlist = createAsyncThunk('wishlist/addItemToWishlist', async (product) => {
  const response = await addToWishlist(product);
  console.log('response from thunk add wishlist', response)
  if(response?.data?.msg=="Add to wishlist successfully"){
    toast.success("Added to Wishlist!", {
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
  }
  if(response?.data?.msg=="Remove to wishlist successfully"){
    toast.success("Removed from Wishlist!", {
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
  }
 
  return response.data;
  
});


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
    wishlistCount: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    initLocalStorage: (state, action) => {
      const { wishlist } = action.payload;
      state.wishlistItems = wishlist.wishlist_product || [{},{},{}];
      state.wishlistCount = wishlist.wishlist_product_count || 0;
    },
    emptyWishlist: (state) => {
      state.wishlistItems = [];
      state.wishlistCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchWishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlistItems = action.payload.result || [];
        state.wishlistCount = action.payload.result?.length || 0;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // addItemToWishlist
      .addCase(addItemToWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlistItems = action.payload.wishlist_product_list;
        state.wishlistCount = action.payload.wishlist_product_list?.length;
      })
      .addCase(addItemToWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { initLocalStorage, emptyWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
