import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
 reducer: {
   [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer
 },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});