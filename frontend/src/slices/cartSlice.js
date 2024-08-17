import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === existingItem._id ? action.payload : item
        );
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
      updateCart(state);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      updateCart(state);
    },
    removeCartItem: (state, action) => {
      state.cartItems = [];
      updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
  },
});

export const { addToCart, removeItem, saveShippingAddress, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
