import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedAdminRoutes = () => {
  const { user } = useAuth()

  if (!user && user.jefe === 1) {
    return <Navigate to='/login' />
  }

  return <Outlet />
}
