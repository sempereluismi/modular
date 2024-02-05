import { createBrowserRouter } from "react-router-dom";
import { Ejemplo } from "../views/ejemplo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Ejemplo />,
  },
]);

export default router;
