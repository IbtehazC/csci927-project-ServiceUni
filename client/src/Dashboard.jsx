import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Container } from "react-bootstrap";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const user = useContext(UserContext);

  return (
    <Container style={{ marginTop: "1rem" }}>
      {user.user.role === "student" && <StudentDashboard user={user.user} />}
      {user.user.role === "admin" && <AdminDashboard user={user.user} />}
    </Container>
  );
};

export default Dashboard;
