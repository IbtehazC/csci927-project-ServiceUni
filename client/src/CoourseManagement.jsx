import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

const CourseManagement = () => {
  const [courseName, setCourseName] = useState("");

  const handleAddCourse = async () => {
    try {
      await axios.post("/course-add-drop/add", { name: courseName });
      alert("Course added successfully!");
    } catch (error) {
      alert("Failed to add course!");
    }
  };

  const handleDropCourse = async () => {
    try {
      await axios.post("/course-add-drop/drop", { name: courseName });
      alert("Course dropped successfully!");
    } catch (error) {
      alert("Failed to drop course!");
    }
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Header>Course Management</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="success"
            onClick={handleAddCourse}
          >
            Add Course
          </Button>{" "}
          <Button
            variant="danger"
            onClick={handleDropCourse}
          >
            Drop Course
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CourseManagement;
