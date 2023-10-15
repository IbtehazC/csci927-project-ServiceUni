import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Card, Button } from "react-bootstrap";

const AdminDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  // Simulate fetching courses from the backend
  useEffect(() => {
    // Replace the URL with your real backend URL
    axios
      .get("http://localhost:3002/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Simulate fetching courses from the backend
  useEffect(() => {
    // Replace the URL with your real backend URL
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Handler to assign faculty to a course
  const handleAssignFaculty = (courseId) => {
    // Your logic to assign faculty
    console.log(`Assigning faculty to course ID: ${courseId}`);
  };

  return (
    <div>
      {console.log(user)}
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{`${user.firstname} ${user.lastname}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
          <Card.Text>
            <strong>Username: </strong>
            {user.username}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ margin: "20px" }}>
        <Card.Header>All Users</Card.Header>
        <Card.Body>
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item key={user._id}>
                {user.firstname} ({user.role})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card style={{ margin: "20px" }}>
        <Card.Header>All Courses</Card.Header>
        <Card.Body>
          {courses.map((course) => (
            <Card
              key={course._id}
              style={{ marginBottom: "15px" }}
            >
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                {course.faculty !== "" && (
                  <Card.Subtitle>{course.faculty}</Card.Subtitle>
                )}
                <Button
                  variant="primary"
                  onClick={() => handleAssignFaculty(course._id)}
                >
                  Assign Faculty
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
