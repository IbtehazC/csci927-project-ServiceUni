import CourseManagement from "./CourseManagement";
import Library from "./Library";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";
import { UserProvider } from "./UserContext";
import UsersList from "./UserList";
import { Container, Stack } from "react-bootstrap";
import CoursesList from "./CourseList";
import CreateCourse from "./CreateCourse";
import AddBook from "./AddBook";

function App() {
  return (
    <UserProvider>
      <Container>
        <Stack direction="horizontal">
          <div className="p-2">
            <UsersList />
          </div>
          <div className="p-2">
            <UserLogin />
          </div>
          <div className="p-2">
            <UserRegistration />
          </div>
        </Stack>
        <Stack direction="horizontal">
          <div className="p-2">
            <CourseManagement />
          </div>
          <div className="p-2">
            <CoursesList />
          </div>
          <div className="p-2">
            <CreateCourse />
          </div>
        </Stack>
        <Stack direction="horizontal">
          <div className="p-2">
            <Library />
          </div>
          <div className="p-2">
            <AddBook />
          </div>
        </Stack>
      </Container>
    </UserProvider>
  );
}

export default App;
