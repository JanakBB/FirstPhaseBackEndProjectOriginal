import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/react.svg";
import {FaShoppingCart, FaUser} from "react-icons/fa";

const Header = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" /> Broadway
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto">
            <Nav.Link><FaShoppingCart/> Cart</Nav.Link>
            <Nav.Link><FaUser/> Signin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
