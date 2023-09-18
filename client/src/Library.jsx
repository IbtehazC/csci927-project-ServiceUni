import  { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

const Library = () => {
  const [bookName, setBookName] = useState("");

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
      </Card.Body>
    </Card>
  );
};

export default Library;
