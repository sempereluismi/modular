/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const ModelsContext = createContext()

export function ModelsProvider ({ children }) {
  const [adminModels, setAdminModels] = useState([])
  const [profesorModels, setProfesorModels] = useState([])

  const contextValue = {
    adminModels,
    setAdminModels,
    profesorModels,
    setProfesorModels
  }
  return (
    <ModelsContext.Provider value={contextValue}>
      {children}
    </ModelsContext.Provider>
  )
}
