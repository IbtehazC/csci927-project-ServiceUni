import { useContext } from "react";
import CoursesList from "./CoursesList";
import { UserContext } from "./UserContext";
import { Container } from "react-bootstrap";
import BooksList from "./BooksLists";

const Dashboard = () => {
  const user = useContext(UserContext);

  return (
    <Container>
      <h1>{`Hi ${user.user.username}`}</h1>
      <CoursesList />
      <BooksList />
    </Container>
  );
};

export default Dashboard;
