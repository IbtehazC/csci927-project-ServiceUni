import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComonent";

const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default Layout;
