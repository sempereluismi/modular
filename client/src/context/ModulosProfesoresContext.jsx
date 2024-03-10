/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

// Crear el contexto
export const ModulosProfesoresContext = createContext()
// Crear el proveedor
export function ModulosProfesoresProvider ({ children }) {
  const [positions, setPositions] = useState([])
  const [modulos, setModulos] = useState([])
  const [profesores, setProfesores] = useState([])
  const [draggedModulo, setDraggedModulo] = useState(null)
  const [draggedProfesor, setDraggedProfesor] = useState(null)
  const [draggedFromBoard, setDraggedFromBoard] = useState(false)

  const contextValue = {
    modulos,
    setModulos,
    profesores,
    setProfesores,
    draggedModulo,
    setDraggedModulo,
    draggedFromBoard,
    setDraggedFromBoard,
    draggedProfesor,
    setDraggedProfesor,
    positions,
    setPositions
  }

  return (
    <ModulosProfesoresContext.Provider value={contextValue}>
      {children}
    </ModulosProfesoresContext.Provider>
  )
}
