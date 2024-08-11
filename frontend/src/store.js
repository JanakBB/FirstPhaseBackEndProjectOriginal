import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
 reducer: {
   [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
 },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});