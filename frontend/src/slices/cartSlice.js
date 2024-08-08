import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems = [...state.cartItems, action.payload];
        },
        removeItem: (state, action) => {

        }
    }
});

export const {addToCart, removeItem} = cartSlice.actions;

export default cartSlice.reducer;