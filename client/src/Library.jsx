import { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  ListGroup,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { UserContext } from "./UserContext";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const { user } = useContext(UserContext);

  const fetchAvailableBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/books"); // Adjust this URL to match your backend route
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  // Fetch available books when the component mounts
  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const handleRentBook = async (bookId) => {
    try {
      await axios.post(`http://localhost:3001/${user._id}/rent`, { bookId });
      setMessage("Book rented successfully!");
      setMessageType("success");
      fetchAvailableBooks();
    } catch (error) {
      alert("Failed to rent book!");
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="display-4">Available Books</h1>
          {!user && <Alert variant="info">Log in to rent books.</Alert>}
        </Col>
      </Row>
      <Row>
        <Col>
          {message && <Alert variant={messageType}>{message}</Alert>}
          <ListGroup>
            {books.map((book) => (
              <ListGroup.Item key={book._id}>
                Title: {book.title}, Author: {book.author}
                {book.rentedBy ? (
                  <span className="text-danger"> (Rented)</span>
                ) : user ? (
                  <Button
                    variant="primary"
                    onClick={() => handleRentBook(book._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Rent
                  </Button>
                ) : (
                  <span style={{ marginLeft: "10px" }}></span>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Library;
