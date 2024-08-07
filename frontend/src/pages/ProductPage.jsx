import { Col, Row, Image, ListGroup, Button } from "react-bootstrap"
import Rating from "../components/Rating";


const ProductPage = () => {
    let product = {
        name: "Airpods Wireless Bluetooth Headphones",
        image: "/images/airpods.jpg",
        description:
          "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        brand: "Apple",
        category: "Electronics",
        price: 89.99,
        countInStock: 155550,
        rating: 4.5,
        numReviews: 12,
      }

      return(
        <Row>
            <Col md={5}>
                <Image src={product.image} fluid/>
            </Col>
            <Col md={4}>
                <ListGroup variant="flush"> 
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5>Price ${product.price}</h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={product.numReviews} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>{product.description}</span>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price</Col>
                            <Col><strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status</Col>
                            <Col><strong>{product.countInStock > 0 ? `In Stock(${product.countInStock})` : "Out of Stock"}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button variant="secondary" disabled={product.countInStock === 0}>
                            Add to Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
      )
}

export default ProductPage;