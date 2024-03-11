/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'

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
  const [filteredModulos, setFilteredModulos] = useState([])
  const [regimen, setRegimen] = useState(() => {
    // Intentar obtener el usuario del sessionStorage al inicio
    const savedUser = sessionStorage.getItem('regimen')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [allRegimen, setAllRegimen] = useState([])

  useEffect(() => {
    sessionStorage.setItem('regimen', JSON.stringify(regimen))
    const filtered = modulos.filter(modulo => modulo.regimen === regimen)
    setFilteredModulos(filtered)
  }, [regimen])

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
    setPositions,
    regimen,
    setRegimen,
    allRegimen,
    setAllRegimen,
    filteredModulos,
    setFilteredModulos
  }

  return (
    <ModulosProfesoresContext.Provider value={contextValue}>
      {children}
    </ModulosProfesoresContext.Provider>
  )
}
