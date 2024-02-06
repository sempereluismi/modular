import { createBrowserRouter } from "react-router-dom";
import { Ejemplo } from "../views/ejemplo.jsx";
import { DirunoNocturnoPage } from "../views/DiurnoNocturnoPage.jsx";
import { InsertarPlantillaPage } from "../views/InsertarPlantillaPage.jsx";
import { InsertarProfesorPage } from "../views/InsertarProfesorPage.jsx";
import { ObtenerModulosPage } from "../views/obtenerModulosPage.jsx";
import { LogInPage } from "../views/LogInPage.jsx";
import { CardModulosPage } from "../views/CardModulosPage.jsx";
import { ListaProfesoresPage } from "../views/ListaProfesoresPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Ejemplo />,
  },
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
