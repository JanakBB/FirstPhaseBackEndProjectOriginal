import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
    cartItems: localStorage.getItem("cart") ?  JSON.parse(localStorage.getItem("cart")) : [],
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
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
        }
    }
});

export const {addToCart, removeItem} = cartSlice.actions;

export default cartSlice.reducer;