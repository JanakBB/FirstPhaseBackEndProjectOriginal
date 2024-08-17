import { useParams, Link } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/orderSlice";
import { Col, ListGroup, Row, Image, Card, Badge } from "react-bootstrap";
import Message from "../components/Message";
import { orderStatusColors } from "../utils/orderStatusColors";

const OrderPage = () => {
  const { id } = useParams();
  console.log(id);
  const { data: order, refetch, isLoading, error } = useGetOrderByIdQuery(id);
  console.log(order);
  return isLoading ? (
    <h6>Loading...</h6>
  ) : error ? (
    <Message variant="danger">{error.data.error}</Message>
  ) : (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <p>
              Recipient: {order.shippingAddress.recipient} |{" "}
              {order.shippingAddress.phone}
              <br />
              Address: {order.shippingAddress.address} |{" "}
              {order.shippingAddress.city}
            </p>
            {order.isDelivered ? (
              <Message>
                Delivered at {order.isDeliveredAt.substring(0, 10)}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Payment</h3>
            <p>Mode: COD</p>
            {order.isPaid ? (
              <Message>Pain on {order.deliveredAt.substring(0, 10)}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <ListGroup.Item>
              {order.orderItems.map((item) => (
                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col>
                      {item.qty} X {item.price} ={" "}
                      {(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>{order.itemPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping</Col>
                <Col>{order.shippingCharge}</Col>
              </Row>
              <Row>
                <Col>Total</Col>
                <Col>{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status</Col>
                <Col>
                  <Badge bg={orderStatusColors[order.status]}>
                    {order.status}
                  </Badge>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderPage;
