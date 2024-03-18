/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'

// Crear el contexto
export const ModulosProfesoresContext = createContext()
// Crear el proveedor
export function ModulosProfesoresProvider ({ children }) {
  const [positions, setPositions] = useState([])
  const [draggedModulo, setDraggedModulo] = useState(null)
  const [draggedProfesor, setDraggedProfesor] = useState(null)
  const [draggedFromBoard, setDraggedFromBoard] = useState(false)
  const [filteredModulos, setFilteredModulos] = useState([])
  const [filteredProfesores, setFilteredProfesores] = useState([])
  const [allRegimen, setAllRegimen] = useState(() => {
    const savedUser = sessionStorage.getItem('allRegimen')
    return savedUser ? JSON.parse(savedUser) : []
  })
  const [regimen, setRegimen] = useState(() => {
    // Intentar obtener el usuario del sessionStorage al inicio
    const savedUser = sessionStorage.getItem('regimen')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [profesores, setProfesores] = useState(() => {
    // Intentar obtener el usuario del sessionStorage al inicio
    const savedUser = sessionStorage.getItem('profesores')
    return savedUser ? JSON.parse(savedUser) : []
  })

  const [modulos, setModulos] = useState(() => {
    // Intentar obtener el usuario del sessionStorage al inicio
    const savedUser = sessionStorage.getItem('modulos')
    return savedUser ? JSON.parse(savedUser) : []
  })

  useEffect(() => {
    sessionStorage.setItem('allRegimen', JSON.stringify(allRegimen))
  }, [allRegimen])

  useEffect(() => {
    sessionStorage.setItem('regimen', JSON.stringify(regimen))
    const filteredModulos = modulos.filter(modulo => modulo.regimen === regimen)
    setFilteredModulos(filteredModulos)
    const filteredProfesores = profesores.filter(profesor => profesor.regimen === regimen)
    setFilteredProfesores(filteredProfesores)
  }, [regimen])

  useEffect(() => {
    sessionStorage.setItem('profesores', JSON.stringify(profesores))
  }, [profesores])

  useEffect(() => {
    sessionStorage.setItem('modulos', JSON.stringify(modulos))
  }, [modulos])

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
    setFilteredModulos,
    filteredProfesores,
    setFilteredProfesores
  }

  return (
    <ModulosProfesoresContext.Provider value={contextValue}>
      {children}
    </ModulosProfesoresContext.Provider>
  )
}
