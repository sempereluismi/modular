import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function useAuth () {
  const { user, setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  function isLogged () {
    return user !== null
  }

  function redirectIfNotLogged (path = '/login') {
    if (!isLogged()) {
      navigate(path)
    }
  }

  async function getRol (id) {
    if (!isLogged()) {
      return
    }

    const res = await fetch(`http://localhost:8000/api/auth/rol/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const data = await res.json()
      return data.rol
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
      setLoading(false)
      return false
    }
  }

  return {
    isLogged,
    user,
    getRol,
    login,
    loading,
    redirectIfNotLogged
  }
}