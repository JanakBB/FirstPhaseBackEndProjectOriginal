import { Col, ListGroup, Row, Image, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeItem } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartItemHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeCartItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
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
      {cartItems.length > 0 && (
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h4>
                Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Sub Total</Col>
                <Col>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping Cost</Col>
                <Col>${5}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total Price</Col>
                <Col>
                  ${(cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  ) + 5).toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button>Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      )}
    </Row>
  );
};

export default CartPage;
