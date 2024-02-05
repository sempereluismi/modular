import { createBrowserRouter } from "react-router-dom";
import { Ejemplo } from "../views/ejemplo.jsx";
import { DirunoNocturnoPage } from "../views/DiurnoNocturnoPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Ejemplo />,
  },
  {
    path: "/quenda",
    element: <DirunoNocturnoPage />,
  },
]);

export default router;
