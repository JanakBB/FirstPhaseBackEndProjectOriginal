import { Col, Container, Row } from "react-bootstrap"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Product from "./components/Product"
import products from "./data"
import ProductPage from "./pages/ProductPage"
import HomePage from "./pages/HomePage"
import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
    <Header />
     <Container>
       <Outlet />
     </Container>
     <Footer/>
    </>
  )
}

export default App
