// store/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { addToCart } from '../utils/api';
// import storage from '../utils/localStorage';

const initialState = {
    cart: [],
    cartCount: 0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
            state.cartCount++;
        },
        deleteFromCart: (state, action) => {
            const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.cart.splice(itemIndex, 1);
                state.cartCount--;
            }
        },
        cartCount: (state) => {
            state.cartCount = state.cart.length;
        }
    }
})

export const { addToCart, deleteFromCart, cartCount } = cartSlice.actions


// Async thunk for adding to cart
// export const addToCartAsync = createAsyncThunk(
//   'cart/addToCart',
//   async (product, { rejectWithValue }) => {
//     try {
//       const response = await addToCart(product);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: storage.getItem('cartItems') || initialState,
//     status: 'idle',
//     error: null
//   },
//   reducers: {
//     setCartItems: (state, action) => {
//       state.items = action.payload;
//       storage.setItem('cartItems', action.payload);
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCartAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addToCartAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//         storage.setItem('cartItems', action.payload);
//       })
//       .addCase(addToCartAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   }
// });

// export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
