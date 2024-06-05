import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import { DirunoNocturnoPage } from '../views/DiurnoNocturnoPage.jsx'
import { InsertarModuloPage } from '../views/InsertarModuloPage.jsx'
import { InsertarPlantillaPage } from '../views/InsertarPlantillaPage.jsx'
import { InsertarProfesorPage } from '../views/InsertarProfesorPage.jsx'
import { ListaProfesores } from '../views/ListaProfesores.jsx'
import { LogInPage } from '../views/LogInPage.jsx'
import { LogOutPage } from '../views/LogOutPage.jsx'
import { ProtectedAdminRoutes } from '../views/ProtectedAdminRoutes.jsx'
import { ProtectedAuthRoutes } from '../views/ProtectedAuthRoutes.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LogInPage />} />
      <Route path='/logout' element={<LogOutPage />} />
      <Route path='/user' element={<ProtectedAuthRoutes />}>
        <Route path='model' element={<DirunoNocturnoPage />} />
        <Route path='models' element={<InsertarPlantillaPage />} />
      </Route>
      <Route path='/admin' element={<ProtectedAdminRoutes />}>
        <Route path='insert'>
          <Route path='teachers' element={<InsertarProfesorPage />} />
          <Route path='modules' element={<InsertarModuloPage />} />
        </Route>
        <Route path='teachers-list' element={<Navigate to='/admin/teachers-list/1' replace />} />
        <Route path='teachers-list/:page' element={<ListaProfesores />} />
      </Route>
    </>
  )
)

export default router
