import React from 'react';
import ReactDOM from 'react-dom/client';
import{RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="" element={<App/>}>
      <Route path="" element={<HomePage/>} />
      <Route path="/product" element={<ProductPage/>} />
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />
)
