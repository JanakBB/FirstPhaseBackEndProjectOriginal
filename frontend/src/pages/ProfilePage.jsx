import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderSlice";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserProfile, { isLoading: updateProfileLoading }] =
    useUpdateUserProfileMutation();
  const { data: orders, isLoading: ordersLoading, error } = useGetMyOrdersQuery();
  console.log(orders)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password not matched");
      } else {
        let resp = await updateUserProfile({
          name,
          email,
          currentPassword,
          password,
        }).unwrap();
        dispatch(setCredentials(resp.user));
        toast.success(resp.message);
      }
    } catch (err) {
      toast.error(err.data.error);
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h3>Profile</h3>
        <Form onSubmit={updateProfileHandler}>
          <Form.Group className="my-3" controlId="name">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="currentpassword">
            <Form.Control
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="confirmpassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h3>My Orders</h3>
        {ordersLoading ? (
        <h6>Loading...</h6>
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <Table responsive striped hover className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Delivered</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {
                orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes style={{color: "red"}} />}</td>
                        <td>{order.isPaid ? order.deliveredAt.substring(0, 10) : <FaTimes style={{color: "red"}} />}</td>
                        <td><Link to={`/order/${order._id}`}><Button variant="dark" size="sm" rounded="true">Details</Button></Link></td>
                    </tr>
                ))
            }
          </tbody>
        </Table>
      )}
      </Col>
    </Row>
  );
};

export default ProfilePage;