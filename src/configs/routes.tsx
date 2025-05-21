import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/Home";

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    path: "/",
    element: <Home />,
  },
];
