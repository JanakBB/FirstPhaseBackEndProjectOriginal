import React from 'react';
import ReactDOM from 'react-dom/client';
import{RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from "./pages/CartPage.jsx";
import SigninPage from "./pages/SigninPage.jsx";
import {Provider} from "react-redux";
import { store } from './store.js';
import Shipping from './pages/ShippingPage.jsx';
import PrivateRouter from './components/PrivateRouter.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="" element={<App/>}>
      <Route path="" element={<HomePage/>} />
      <Route path="/product/:id" element={<ProductPage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/signin" element={<SigninPage/>} />
      <Route path="" element={<PrivateRouter/>}>
        <Route path="/shipping" element={<Shipping/>} />
      </Route>
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <RouterProvider router={router} />
</Provider>
)
