import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import { privateRoutes, publicRoutes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);

export default router;
