import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(existingItem) {
                state.cartItems = state.cartItems.map(item => (item._id === existingItem._id ? action.payload : item));
            } else {
                state.cartItems = [...state.cartItems, action.payload]
            }
        },
        removeItem: (state, action) => {

        }
    }
});

export const {addToCart, removeItem} = cartSlice.actions;

export default cartSlice.reducer;