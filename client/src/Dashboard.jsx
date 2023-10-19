import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Container } from "react-bootstrap";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import FacultyDashboard from "./FacultyDashboard";

const Dashboard = () => {
  const user = useContext(UserContext);

  return (
    <Container style={{ marginTop: "1rem" }}>
      {user.user.role === "student" && <StudentDashboard user={user.user} />}
      {user.user.role === "admin" && <AdminDashboard user={user.user} />}
      {user.user.role === "faculty" && <FacultyDashboard user={user.user} />}
    </Container>
  );
};

export default Dashboard;
