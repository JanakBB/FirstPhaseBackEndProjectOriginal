import { Col, ListGroup, Row, Image, Card, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { usePlaceOrderMutation } from "../slices/orderSlice";
import { toast } from "react-toastify";

const PlaceOrderPage = () => {
    const cart = useSelector(state => state.cart);
    const [placeOrder, {isLoading}] = usePlaceOrderMutation();

    const placeOrderHandler = async() => {
        try{
            let resp = await placeOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                itemPrice: cart.itemPrice,
                shippingCharge: cart.shippingCharge,
                totalPrice: cart.totalPrice
            }).unwrap();
            toast.success(resp.message);
        } 
        catch(err) {
            toast.error(err.data.error);
        }
    }

    return(
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>Recipient: {cart.shippingAddress.recipient} | {cart.shippingAddress.phone}</p>
                        <p>Address: {cart.shippingAddress.address} | {cart.shippingAddress.city} </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {
                            cart.cartItems.map(item => (
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={2}><Image src={item.image} fluid rounded/></Col>
                                        <Col>
                                            <Link to={`/product/${item._id}`}>
                                                <strong>{item.name}</strong>
                                            </Link>
                                        </Col>
                                        <Col>
                                            {item.qty} X {item.price} = {(item.qty * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))
                        }
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
                                <Col>{cart.itemPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{cart.shippingCharge}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button onClick={placeOrderHandler} variant="dark">Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default PlaceOrderPage;