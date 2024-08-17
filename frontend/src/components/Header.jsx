import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../assets/react.svg";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useUserLogoutMutation } from "../slices/usersApiSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const {userInfo} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [userLogout, {isLoading}] = useUserLogoutMutation();

  const logoutHandler = async() => {
    try{
      let resp = await userLogout().unwrap();
      dispatch(logout())
      toast.success(resp.message);
      navigate("/signin");
    } catch(err) {
      toast.error(err.data.error)
    }
  }
  return (
    <Navbar variant="dark" bg="dark" expand="md" collapseOnSelect>
      <Container>
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="logo" /> Broadway
        </NavLink>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto">
            <NavLink to="/cart" className="nav-link">
              <FaShoppingCart /> Cart
              {(cartItems.length) > 0 && (
                <Badge bg="success" pill>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Badge>
              )}
            </NavLink>
            {!userInfo ? (
                          <NavLink to="/signin" className="nav-link">
                           <FaUser /> Signin
                          </NavLink>
            ) : (
              <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item onClick={() => {navigate("/profile")}}>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
  );
};

export default Header;
