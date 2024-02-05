import { createBrowserRouter } from "react-router-dom";
import { Ejemplo } from "../views/ejemplo.jsx";
import { InsertarPlantillaPage } from "../views/InsertarPlantillaPage.jsx";
import { InsertarProfesorPage } from "../views/InsertarProfesorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Ejemplo />,
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
