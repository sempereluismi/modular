import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedAuthRoutes = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to='/' />
  }

  return <Outlet />
}
