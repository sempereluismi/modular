import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { loginService } from '../service/auth'

export function useAuth () {
  const { user, setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  function isLogged () {
    return user !== null
  }

  function logout () {
    sessionStorage.clear()
    setUser(null)
  }

  function isAdmin () {
    return user.jefe === 1
  }

  function redirectIfNotLogged (path = '/login') {
    if (!isLogged()) {
      navigate(path)
    }
  }

  async function login (email, password) {
    setLoading(true)
    loginService(email, password).then((data) => {
      setLoading(false)
      if (!data) {
        setError('Usuario o contraseña incorrectos')
        return
      }
      setUser(data)
    })
  }

  return {
    isLogged,
    user,
    login,
    loading,
    redirectIfNotLogged,
    isAdmin,
    logout,
    error
  }
}
