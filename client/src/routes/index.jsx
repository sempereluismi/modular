import { createBrowserRouter } from "react-router-dom";
import { Ejemplo } from "../views/ejemplo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Ejemplo />,
  },
  {
    path: "/gethours",
    element: <GetHoursPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  }
]);

export default router;
