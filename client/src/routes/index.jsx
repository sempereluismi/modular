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
    path: "/quenda",
    element: <DirunoNocturnoPage />,
  },
  {
    path: "/insertar",
    element: <InsertarPlantilla888Page />,
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
