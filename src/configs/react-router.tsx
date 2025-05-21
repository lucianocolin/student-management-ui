import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import { publicRoutes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [...publicRoutes],
  },
]);

export default router;
