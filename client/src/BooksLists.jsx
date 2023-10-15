import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ListGroup, Card, Alert, Button, Row, Col } from "react-bootstrap";
import { UserContext } from "./UserContext";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/${user.user._id}/books`
      );
      setBooks(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (bookId) => {
    try {
      await axios.post(`http://localhost:3001/${user.user._id}/return`, {
        bookId,
      });
      // Refresh the book list after successfully returning a book
      fetchBooks();
    } catch (error) {
      setError("Failed to return the book.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ marginTop: "20px" }}>
      <Card.Header>Books you currently have rented:</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <ListGroup>
          {books.map((book) => (
            <ListGroup.Item key={book._id}>
              <Row>
                <Col
                  xs={12}
                  md={8}
                >
                  Book Title: {book.title}
                  {book.author && <span>, Author: {book.author}</span>}
                  {book.returnDate && (
                    <span>, Return By: {book.returnDate}</span>
                  )}
                </Col>
                <Col
                  xs={12}
                  md={4}
                >
                  <Button
                    variant="outline-danger"
                    style={{ float: "right", marginTop: "5px" }}
                    onClick={() => handleReturnBook(book._id)}
                  >
                    Return Book
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default BooksList;
