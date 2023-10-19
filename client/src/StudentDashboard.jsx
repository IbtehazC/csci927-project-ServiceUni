import { Row, Col, Container } from "react-bootstrap";
import CoursesList from "./CoursesList";
import BooksList from "./BooksLists";

const StudentDashboard = ({ user }) => {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1>{`${user.firstname} ${user.lastname}`}</h1>
          <p className="mb-2 text-muted">{user.role}</p>
          <p>
            <strong>Username: </strong>
            {user.username}
          </p>
        </Col>
      </Row>
      <CoursesList />
      <BooksList />
    </Container>
  );
};

export default StudentDashboard;
