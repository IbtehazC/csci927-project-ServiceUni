import { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from './UserContext';  // adjust path as necessary

const UserLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/login', { username, password });
            if (response.data && response.data.user) {
                setUser(response.data.user);
            } else {
                alert('Invalid login credentials.');
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UserLogin;
