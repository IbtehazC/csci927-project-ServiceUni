import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async () => {
    try {
      await axios.post("/user-authentication/register", {
        username,
        password,
        role,
      });
      alert("User registered successfully!");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Header>User Registration</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserRegistration;
