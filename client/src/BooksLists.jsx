import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ListGroup, Card, Alert } from "react-bootstrap";
import { UserContext } from "./UserContext";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/${user.user._id}/books`
        );
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ marginTop: "20px" }}>
      <Card.Header>Books you currently have rented:</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">Failed to fetch books.</Alert>}
        <ListGroup>
          {books.map((book) => (
            <ListGroup.Item key={book._id}>
              Book Title: {book.title}
              {book.author && <span>, Author: {book.author}</span>}
              {book.returnDate && <span>, Return By: {book.returnDate}</span>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default BooksList;
