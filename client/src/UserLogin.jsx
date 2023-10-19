import { useState, useContext } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "./UserContext"; // adjust path as necessary
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      setUser(response.data.user);
      navigate(`/${response.data.user._id}/dashboard`);
    } catch (error) {
      setMessage({
        type: "danger",
        content: "Failed to Login!",
      });
    }
  };

  return (
    <Container>
      {message && <Alert variant={message.type}>{message.content}</Alert>}
      <h1 className="display-4">User Login</h1>
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
        <Button
          variant="primary"
          onClick={handleSubmit}
          className="mt-4 btn-lg"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default UserLogin;
