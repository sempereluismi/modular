import { createBrowserRouter } from "react-router-dom";
import { DiurnoNocturnoPage } from "../views/DiurnoNocturnoPage.jsx";
import { InsertarPlantillaPage } from "../views/InsertarPlantillaPage.jsx";
import { InsertarProfesorPage } from "../views/InsertarProfesorPage.jsx";
import { ObtenerModulosPage } from "../views/obtenerModulosPage.jsx";
import { LogInPage } from "../views/LogInPage.jsx";
import { CardModulosPage } from "../views/CardModulosPage.jsx";
import { ListaProfesoresPage } from "../views/ListaProfesoresPage.jsx";


const router = createBrowserRouter([
  {
    path: "/obtenermodulos",
    element: <ObtenerModulosPage />,
    children: [
      {
        path: "listaprofesores",
        element: <ListaProfesoresPage />,
      },
      {
        path: "listamodulos",
        element: <CardModulosPage />,
      },
    ],
  },
  {
    path: "/inicio",
    element: <LogInPage />,
  },
  {
    path: "/turno",
    element: <DiurnoNocturnoPage />,
  },
  {
    path: "/insertar",
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
