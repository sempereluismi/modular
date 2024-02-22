import { createBrowserRouter } from 'react-router-dom'
import { Ejemplo } from '../views/ejemplo.jsx'
import { DirunoNocturnoPage } from '../views/DiurnoNocturnoPage.jsx'
import { InsertarPlantillaPage } from '../views/InsertarPlantillaPage.jsx'
import { InsertarProfesorPage } from '../views/InsertarProfesorPage.jsx'
import { RecogerHorasYModulos } from '../views/RecogerHorasYModulos.jsx' // Import the RecogerHorasYModulos component but not used yet
import { LogInPage } from '../views/LogInPage.jsx'
import { Menu } from '../views/Menu.jsx' // Import the Menu component but not used yet
import { ListaProfesores } from '../views/ListaProfesores.jsx'
import { ElegirModulos } from '../views/ElegirModulos.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Ejemplo />
  },
  {
    path: '/recogerhorasymodulos',
    children: [
      {
        path: 'elegirModulos',
        element: <ElegirModulos />
      },
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
    path: '/menu',
    element: <Menu />
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
