import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const AddBook = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/books', {
                title: bookTitle,
                author: bookAuthor,
            });
            setMessage({
                type: 'success',
                content: 'Book added successfully!',
            });
            setBookTitle('');
            setBookAuthor('');
        } catch (error) {
            setMessage({
                type: 'danger',
                content: 'Failed to add book!',
            });
        }
    };

    return (
        <Card style={{ marginTop: '20px' }}>
            <Card.Header>Add New Book</Card.Header>
            <Card.Body>
                {message && <Alert variant={message.type}>{message.content}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            value={bookAuthor}
                            onChange={(e) => setBookAuthor(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Book
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddBook;
