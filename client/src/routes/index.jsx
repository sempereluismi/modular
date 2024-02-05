import { createBrowserRouter } from "react-router-dom";
import { Ejemplo } from "../views/ejemplo.jsx";
import { DirunoNocturnoPage } from "../views/DiurnoNocturnoPage.jsx";
import { InsertarPlantillaPage } from "../views/InsertarPlantillaPage.jsx";
import { InsertarProfesorPage } from "../views/InsertarProfesorPage.jsx";

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
  },
  {
    path: "/quenda",
    element: <DirunoNocturnoPage />,
  },
  {
    path: "/insertar",
    element: <InsertarPlantillaPage />,
    children: [
      {
        path: "plantilla",
        element: <InsertarPlantillaPage />,
      },
      {
        path: "profesores",
        element: <InsertarProfesorPage />,
      },
    ],
  },

]);

export default router;
