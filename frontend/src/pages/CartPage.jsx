import { Col, ListGroup, Row, Image, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeItem } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";

const CartPage = () => {
  const { cartItems, itemPrice, shippingCharge, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const cartItemHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeCartItem = (id) => {
    dispatch(removeItem(id));
  };

  return cartItems.length === 0 ? (
    <Message>
      Cart is Empty. <Link to="/">Go Back</Link>
    </Message>
  ) : (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item>
              <Row>
                <Col md={2}>
                  <Image src={item.image} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item._id}`}>
                    <strong>{item.name}</strong>
                  </Link>
                </Col>
                <Col md={2}>
                  <strong>{(item.price * item.qty).toFixed(2)}</strong>
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) =>
                      cartItemHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeCartItem(item._id)}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroup.Item>
            <h4>
              Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h4>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Sub Total</Col>
              <Col>${itemPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Shipping Cost</Col>
              <Col>${shippingCharge}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Total Price</Col>
              <Col>${totalPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/signin?redirect=/shipping" className="btn btn-secondary">
              Checkout
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartPage;
