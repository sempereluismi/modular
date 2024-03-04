/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(() => {
    // Intentar obtener el usuario del sessionStorage al inicio
    const savedUser = sessionStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Utilizar useEffect para guardar el usuario en el sessionStorage cada vez que cambie
  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const contextValue = {
    user,
    setUser
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
