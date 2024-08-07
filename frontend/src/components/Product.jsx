import { Card } from "react-bootstrap"
import Rating from "./Rating";

const Product = ({product}) => {
    return(
        <Card className="my-3 p-3 rounded">
            <Card.Img variant="top" src={product.image}/>
            <Card.Body>
                <Card.Text as="div" className="product-title">
                    <strong>{product.name}</strong>
                </Card.Text>
                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
                <Card.Text>
                    <Rating value={product.rating} text={product.numReviews} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;