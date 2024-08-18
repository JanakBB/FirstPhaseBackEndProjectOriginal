import { useParams, Link } from "react-router-dom";
import { useChangeStatusMutation, useGetOrderByIdQuery } from "../slices/orderSlice";
import { Col, ListGroup, Row, Image, Card, Badge, Form } from "react-bootstrap";
import Message from "../components/Message";
import { orderStatusColors } from "../utils/orderStatusColors";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderByIdQuery(id);

  const [changeStatus, {isLoading: statusUpdateLoading}] = useChangeStatusMutation();

  const changeOrderStatus = async(id, value) => {
    try{
      let resp = await changeStatus({id, body: {status: value}}).unwrap();
      setIsEdit(false)
      refetch();
      toast.success(resp.message)
    }catch(err){
      toast.error(err.data.error)
    }
  };

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
                Delivered at {order.deliveredAt.substring(0, 10)}
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
                <Col md={3}>Status</Col>
                <Col md={7}>
                  {isEdit ? (
                    <Form.Control
                      as="select"
                      onChange={(e) => changeOrderStatus(order._id, e.target.value)}
                    >
                      <option>pending</option>
                      <option>in progress</option>
                      <option>on hold</option>
                      <option>shipped</option>
                      <option>delivered</option>
                    </Form.Control>
                  ) : (
                    <Badge bg={orderStatusColors[order.status]}>
                      {order.status}
                    </Badge>
                  )}
                </Col>
                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <Col>
                    <FaEdit onClick={() => setIsEdit(true)} />
                  </Col>
                )}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderPage;
