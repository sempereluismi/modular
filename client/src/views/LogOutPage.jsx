import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export function LogOutPage () {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [])

  return <Navigate to='/' />
}
