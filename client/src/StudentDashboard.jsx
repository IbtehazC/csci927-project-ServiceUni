import { Row, Col, Card } from "react-bootstrap";
import CoursesList from "./CoursesList";
import BooksList from "./BooksLists";

const StudentDashboard = ({ user }) => {
  return (
    <>
      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{`${user.firstname} ${user.lastname}`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.role}
              </Card.Subtitle>
              <Card.Text>
                <strong>Username: </strong>
                {user.username}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CoursesList />
      <BooksList />
    </>
  );
};

export default StudentDashboard;
