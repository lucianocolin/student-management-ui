import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/Home";
import Grades from "../pages/grades/Grades";
import Enrollments from "../pages/enrollment/Enrollments";
import Admin from "../pages/admin/Admin";
import RegistrationRequests from "../pages/admin/RegistrationRequests";

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    path: "/",
    element: <Home />,
  },
];

export const privateRoutes: RouteObject[] = [
  {
    path: "/grades",
    element: <Grades />,
  },
  {
    path: "/enrollments",
    element: <Enrollments />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/registration-requests",
    element: <RegistrationRequests />,
  },
];
