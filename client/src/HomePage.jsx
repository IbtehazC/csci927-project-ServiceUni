import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container style={{ marginTop: "50px" }}>
      <Row className="mb-4">
        <Col>
          <h1>Welcome to Our University Portal</h1>
          <p>
            We offer a variety of services to make your university experience as
            smooth as possible.
          </p>
          <Link to="/register">
            <Button
              variant="primary"
              className="mx-2"
            >
              Register
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Course Management</h2>
          <p>
            Enroll in courses, view your schedule, and manage your academic
            life.
          </p>
          <Link to="/courses">Go to Course Management</Link>
        </Col>
        <Col>
          <h2>Library Services</h2>
          <p>
            Borrow books, access digital resources, and manage your library
            account.
          </p>
          <Link to="/library">Go to Library Services</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
