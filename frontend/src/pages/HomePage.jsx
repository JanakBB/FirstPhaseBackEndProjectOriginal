import products from "../data.js";
import Product from "../components/Product";
import { Col, Row } from "react-bootstrap";

const HomePage = () => {
    return(
        <>
            <h2>Latest Products</h2>
            <Row>
                {
                    products.map(product => (
                        <Col sm={12} md={6} lg={4} xlg={3}>
                            <Product product={product} />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default HomePage;