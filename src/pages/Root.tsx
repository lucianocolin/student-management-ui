import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Toaster />
    </>
  );
};

export default Root;
