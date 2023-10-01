import CourseManagement from "./CourseManagement";
import Library from "./Library";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";
import { UserProvider } from "./UserContext";
import UsersList from "./UserList";
import { Container, Stack } from "react-bootstrap";

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
            <UserLogin />
          </div>
        </Stack>
        <Stack direction="horizontal">
          <div className="p-2">
            <Library />
          </div>
          <div className="p-2">
            <UserLogin />
          </div>
        </Stack>
      </Container>
    </UserProvider>
  );
}

export default App;
