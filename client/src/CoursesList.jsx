import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ListGroup, Card, Alert } from "react-bootstrap";
import { UserContext } from "./UserContext";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/${user.user._id}/courses`
        ); // Adjust this URL to your backend route for fetching courses
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ marginTop: "20px" }}>
      <Card.Header>Courses you currently enrolled in:</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">Failed to fetch courses.</Alert>}
        <ListGroup>
          {courses.map((course) => (
            <ListGroup.Item key={course._id}>
              Course Name: {course.name}
              {course.faculty && <span>, Faculty: {course.faculty}</span>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default CoursesList;
