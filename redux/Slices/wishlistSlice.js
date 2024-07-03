import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wishlist: [],
    wishlistCount: 0,
}

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.wishlist.push(action.payload);
            state.wishlistCount++;
        },
        deleteFromWishlist: (state, action) => {
            const itemIndex = state.wishlist.findIndex(item => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.wishlist.splice(itemIndex, 1);
                state.wishlistCount--;
            }
        },
        wishlistCount: (state) => {
            state.wishlistCount = state.wishlist.length;
        }
    }
})

export const { addToWishlist, deleteFromWishlist, wishlistCount } = wishlistSlice.actions

export default wishlistSlice.reducer