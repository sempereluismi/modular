import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

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
    const res = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      const data = await res.json()
      setUser(data)
      setLoading(false)
      return true
    } else {
      setError('Usuario o contraseña incorrectos')
      setLoading(false)
      return false
    }
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
