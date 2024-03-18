import { useAuth } from '../hooks/useAuth'

export function Ejemplo () {
  const { isLogged, user } = useAuth()

  return (
    isLogged() ? <h1>{user.id}</h1> : <h1>Logueado</h1>
  )
}
