import { Col, Container, Row } from "react-bootstrap"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Product from "./components/Product"
import products from "./data"
import ProductPage from "./pages/ProductPage"

function App() {
  return (
    <>
    <Header />
     <Container>
      <ProductPage />
        {/* <Row>
          {
            products.map(product => (
              <Col sm={12} md={6} lg={4} xlg={3}>
                  <Product product={product} />
              </Col>
            ))
          }
        </Row> */}
     </Container>
     <Footer/>
    </>
  )
}

export default App
