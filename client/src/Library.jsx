import { useState, useEffect } from "react";
import { Button, Form, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

const Library = () => {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);

  // Fetch available books when the component mounts
  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/books"); // Adjust this URL to match your backend route
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchAvailableBooks();
  }, []);

  const handleRentBook = async () => {
    try {
      await axios.post("/library/rent", { name: bookName });
      alert("Book rented successfully!");
    } catch (error) {
      alert("Failed to rent book!");
    }
  };

  const handleReturnBook = async () => {
    try {
      await axios.post("/library/return", { name: bookName });
      alert("Book returned successfully!");
    } catch (error) {
      alert("Failed to return book!");
    }
  };

  return (
    <Card>
      <Card.Header>Library</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleRentBook}
          >
            Rent Book
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={handleReturnBook}
          >
            Return Book
          </Button>
        </Form>

        <h5 className="mt-4">Available Books:</h5>
        <ListGroup>
          {books.map((book) => (
            <ListGroup.Item key={book._id}>
              Title: {book.title}, Author: {book.author}
              {book.rentedBy && <span className="text-danger"> (Rented)</span>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Library;
