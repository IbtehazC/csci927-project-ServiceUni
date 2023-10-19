import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Button, Alert, Col, Row, Container } from "react-bootstrap";
import { UserContext } from "./UserContext";

const AvailableCoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext); // Extract user from the context

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3002/courses");
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:3002/${user._id}/courses/${courseId}/addcourse`
      );
      fetchCourses();
    } catch (err) {
      console.error("Failed to enroll:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="display-4">Offered Courses</h1>
          {!user && (
            <Alert variant="info">Log in to enroll into desired courses.</Alert>
          )}
        </Col>
      </Row>
      {error && <Alert variant="danger">Failed to fetch courses.</Alert>}
      <Row className="mt-4">
        {courses.map((course) => (
          <Col
            md={4}
            key={course._id}
            className="mb-4"
          >
            <Card>
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>
                  Faculty: {course.faculty} <br />
                  Seats:{" "}
                  {`${course.enrolledStudents.length}/${course.capacity}`}
                </Card.Text>
                {user ? (
                  course.enrolledStudents.includes(user._id) ? (
                    <span style={{ color: "green" }}>Already Enrolled</span>
                  ) : (
                    course.enrolledStudents.length < course.capacity && (
                      <Button
                        variant="primary"
                        onClick={() => enrollInCourse(course._id)}
                      >
                        Enroll
                      </Button>
                    )
                  )
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AvailableCoursesList;
