import { useState, useEffect, useContext } from "react";
import { Button, Card, ListGroup, Alert } from "react-bootstrap";
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
    <Card>
      <Card.Header>Library</Card.Header>
      <Card.Body>
        {message && <Alert variant={messageType}>{message}</Alert>}
        <h5>Available Books:</h5>
        <ListGroup>
          {books.map((book) => (
            <ListGroup.Item key={book._id}>
              Title: {book.title}, Author: {book.author}
              {book.rentedBy ? (
                <span className="text-danger"> (Rented)</span>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => handleRentBook(book._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Rent
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Library;
