import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/react.svg";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import {NavLink} from "react-router-dom";

const Header = () => {
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
            </NavLink>
            <NavLink to="/signin" className="nav-link">
              <FaUser /> Signin
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
