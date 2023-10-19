import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Card, Button, Form } from "react-bootstrap";

const AdminDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [facultyFirstname, setFacultyFirstname] = useState("");
  const [facultyLastname, setFacultyLastname] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [message, setMessage] = useState(null);

  // Fetch courses
  useEffect(() => {
    axios
      .get("http://localhost:3002/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Fetch users
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAssignFaculty = async () => {
    try {
      const facultyResponse = await axios.get(
        `http://localhost:3000/users/get/name?firstname=${facultyFirstname}&lastname=${facultyLastname}`,
        { facultyFirstname, facultyLastname }
      );
      const facultyId = facultyResponse.data.id;
      console.log(facultyId);
      await axios.post(
        `http://localhost:3002/courses/${selectedCourseId}/assign-faculty`,
        { facultyId }
      );
      setMessage("Faculty assigned successfully.");
    } catch (err) {
      setMessage("Failed to assign faculty.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      const updatedUsers = await axios.get("http://localhost:3000/users");
      setUsers(updatedUsers.data);
      setMessage("User deleted successfully.");
    } catch (err) {
      setMessage("Failed to delete user.");
    }
  };

  return (
    <div>
      <h1>{`${user.firstname} ${user.lastname}`}</h1>
      <p className="mb-2 text-muted">{user.role}</p>
      <p>
        <strong>Username: </strong>
        {user.username}
      </p>

      <Card style={{ margin: "20px" }}>
        <Card.Header>All Users</Card.Header>
        <Card.Body>
          <ListGroup>
            {users.map((userItem) => (
              <ListGroup.Item key={userItem._id}>
                {`${userItem.firstname} (${userItem.role})`}
                {userItem.role !== "admin" && (
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDeleteUser(userItem._id)}
                  >
                    Delete
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card style={{ margin: "20px" }}>
        <Card.Header>Assign Faculty to Course</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="facultyFirstname">
              <Form.Label>Faculty Firstname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter faculty firstname"
                value={facultyFirstname}
                onChange={(e) => setFacultyFirstname(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="facultyLastname">
              <Form.Label>Faculty Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter faculty lastname"
                value={facultyLastname}
                onChange={(e) => setFacultyLastname(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="selectCourse">
              <Form.Label>Select Course</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                <option
                  value=""
                  disabled
                  selected
                >
                  Select a course
                </option>
                {courses.map((course) => (
                  <option
                    key={course._id}
                    value={course._id}
                  >
                    {course.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleAssignFaculty}
            >
              Assign Faculty
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
