import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Navbar.Brand as={Link} to="/">UniService</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/course">Course</Nav.Link>
          <Nav.Link as={Link} to="/library">Library</Nav.Link>
          <Nav.Link as={Link} to="/available/courses">Add Courses</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
