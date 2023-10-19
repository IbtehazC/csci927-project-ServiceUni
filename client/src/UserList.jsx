import { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Card } from "react-bootstrap";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ marginTop: "20px" }}>
      <Card.Header>All Users</Card.Header>
      <Card.Body>
        <ListGroup>
          {users.map((user) => (
            <ListGroup.Item key={user._id}>
              Username: {user.username}, Role: {user.role}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UsersList;
