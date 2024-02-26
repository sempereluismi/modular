import { createBrowserRouter } from 'react-router-dom'
import { Ejemplo } from '../views/ejemplo.jsx'
import { DirunoNocturnoPage } from '../views/DiurnoNocturnoPage.jsx'
import { InsertarPlantillaPage } from '../views/InsertarPlantillaPage.jsx'
import { InsertarProfesorPage } from '../views/InsertarProfesorPage.jsx'
import { LogInPage } from '../views/LogInPage.jsx'
import { ListaProfesores } from '../views/ListaProfesores.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Ejemplo />
  },
  {
    path: '/recogerhorasymodulos',
    children: [
      {
        path: 'listaProfesores',
        element: <ListaProfesores />
      }
    ]
  },
  {
    path: '/login',
    element: <LogInPage />
  },
  {
    path: '/quenda',
    element: <DirunoNocturnoPage />
  },
  {

    path: '/quenda',
    element: <DirunoNocturnoPage />
  },
  {
    path: '/insertar',
    children: [
      {
        path: 'plantilla',
        element: <InsertarPlantillaPage />
      },
      {
        path: 'profesores',
        element: <InsertarProfesorPage />
      }
    ]
  }

])

export default router
