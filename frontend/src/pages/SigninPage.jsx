import { useState , useEffect} from "react";
import FormContainer from "../components/FormContainer";
import { Row, Form, FormGroup, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SigninPage = () => {
  const {userInfo} = useSelector(state => state.auth)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";
    
  const submitHandler = async(e) => {
    try{
        e.preventDefault();
        let resp = await login({email, password}).unwrap();
        dispatch(setCredentials(resp.user))
        toast.success(resp.message)
    } catch(err) {
      console.log(err)
        toast.error(err.data.error)
    }
  };

  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  },[userInfo, redirect, navigate])

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            ></Form.Control>
        </FormGroup>
        <Button type="submit" variant="primary" className="mt-2">
            Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
            New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default SigninPage;
