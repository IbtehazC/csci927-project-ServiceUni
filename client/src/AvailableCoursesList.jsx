// src/components/AvailableCourses.js

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Button, Alert, Col, Row, Container } from "react-bootstrap";
import { UserContext } from "./UserContext"; // Assuming you have a UserContext for logged-in user details

const AvailableCoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3002/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const enrollInCourse = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:3002/${user.user._id}/courses/${courseId}/addcourse`
      );
    } catch (err) {
      console.error("Failed to enroll:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      {error && <Alert variant="danger">Failed to fetch courses.</Alert>}
      <Row>
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
                {course.enrolledStudents.length < course.capacity && (
                  <Button
                    variant="primary"
                    onClick={() => enrollInCourse(course._id)}
                  >
                    Enroll
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AvailableCoursesList;
