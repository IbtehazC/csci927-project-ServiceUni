import Library from "./Library";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";
import { UserProvider } from "./UserContext";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import AvailableCoursesList from "./AvailableCoursesList";
import HomePage from "./HomePage";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/login"
            element={<UserLogin />}
          />
          <Route
            path="/register"
            element={<UserRegistration />}
          />
          <Route
            path="/library"
            element={<Library />}
          />
          <Route
            path="/:id/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/courses"
            element={<AvailableCoursesList />}
          />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
