import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Alert } from 'react-bootstrap';

const FacultyDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [studentIdToAdd, setStudentIdToAdd] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/faculty/${facultyId}/courses`);
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const addStudent = async (courseId) => {
    try {
      await axios.post(`http://localhost:3002/faculty/${user._id}/course/${courseId}/enroll`, {
        studentId: studentIdToAdd,
      });
      // Reload courses
      const response = await axios.get(`http://localhost:3002/faculty/${user._id}/courses`);
      setCourses(response.data);
    } catch (err) {
      console.error('Failed to add student:', err);
    }
  };

  const dropStudent = async (courseId, studentId) => {
    
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {error && <Alert variant="danger">Failed to fetch courses.</Alert>}
      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.name}</h3>
          <Form.Group>
            <Form.Label>Add Student ID</Form.Label>
            <Form.Control
              type="text"
              value={studentIdToAdd}
              onChange={(e) => setStudentIdToAdd(e.target.value)}
            />
            <Button onClick={() => addStudent(course._id)}>Add Student</Button>
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {course.enrolledStudents.map((studentId) => (
                <tr key={studentId}>
                  <td>{studentId}</td>
                  <td>
                    <Button variant="danger" onClick={() => dropStudent(course._id, studentId)}>
                      Drop
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default FacultyDashboard;
