/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

// Crear el contexto
export const AuthContext = createContext()

// Crear el proveedor
export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)

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
