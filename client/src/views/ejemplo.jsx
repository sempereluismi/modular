import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

export function Ejemplo () {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    setUser('Mundo')
  }, [setUser])
  return (
    <h1>hola {user}</h1>
  )
}
