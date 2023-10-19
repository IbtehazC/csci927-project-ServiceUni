import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const NavbarComponent = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    if (user.user) setIsLoggedIn(true);
  }, [user.user]);

  const handleLogout = () => {
    // Simulate logout (replace with actual logic)
    user.setUser(null);
    setIsLoggedIn(false);
    navigate("/"); // Redirect to homepage
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Navbar.Brand
        className=","
        as={Link}
        to="/"
      >
        UniService
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to="/login"
          >
            Login
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/library"
          >
            Library
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/courses"
          >
            Add Courses
          </Nav.Link>
        </Nav>
        <Nav>
          {isLoggedIn ? (
            <>
              <Nav.Link
                as={Link}
                to={`${user.user._id}/dashboard`}
              >
                Dashboard
              </Nav.Link>
              <Button
                variant="outline-light"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <NavDropdown
              title="Account"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to="/login"
              >
                Login
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/register"
              >
                Register
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
