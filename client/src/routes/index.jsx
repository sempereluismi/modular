import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { DirunoNocturnoPage } from '../views/DiurnoNocturnoPage.jsx'
import { InsertarPlantillaPage } from '../views/InsertarPlantillaPage.jsx'
import { InsertarProfesorPage } from '../views/InsertarProfesorPage.jsx'
import { LogInPage } from '../views/LogInPage.jsx'
import { ListaProfesores } from '../views/ListaProfesores.jsx'
import { InsertarModuloPage } from '../views/InsertarModuloPage.jsx'
import { ProtectedAuthRoutes } from '../views/ProtectedAuthRoutes.jsx'
import { ProtectedAdminRoutes } from '../views/ProtectedAdminRoutes.jsx'
import { LogOutPage } from '../views/LogOutPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LogInPage />} />
      <Route path='/logout' element={<LogOutPage />} />
      <Route path='/user' element={<ProtectedAuthRoutes />}>
        <Route path='quenda' element={<DirunoNocturnoPage />} />
        <Route path='plantilla' element={<InsertarPlantillaPage />} />
      </Route>
      <Route path='/admin' element={<ProtectedAdminRoutes />}>
        <Route path='insertar'>
          <Route path='profesores' element={<InsertarProfesorPage />} />
          <Route path='modulos' element={<InsertarModuloPage />} />
        </Route>
        <Route path='listaProfesores' element={<ListaProfesores />} />
      </Route>
    </>
  )
)

export default router
