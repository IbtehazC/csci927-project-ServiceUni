import { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Alert } from "react-bootstrap";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseSeats, setCourseSeats] = useState(0);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3002/courses", {
        name: courseName,
        capacity: courseSeats,
        enrolledStudents: [],
        faculty: null,
      });
      setMessage({
        type: "success",
        content: "Course created successfully!",
      });
      setCourseName("");
      setCourseSeats(0);
    } catch (error) {
      setMessage({
        type: "danger",
        content: "Failed to create course!",
      });
    }
  };

  return (
    <Card style={{ marginTop: "20px" }}>
      <Card.Header>Create New Course</Card.Header>
      <Card.Body>
        {message && <Alert variant={message.type}>{message.content}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Course Capacity</Form.Label>
            <Form.Control
              type="number"
              value={courseSeats}
              onChange={(e) => setCourseSeats(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Create Course
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateCourse;
