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
    const savedAllRegimen = sessionStorage.getItem('allRegimen')
    return savedAllRegimen ? JSON.parse(savedAllRegimen) : []
  })
  const [regimen, setRegimen] = useState(() => {
    // Intentar obtener el usuario del sessionStorage al inicio
    const savedRegimen = sessionStorage.getItem('regimen')
    return savedRegimen ? JSON.parse(savedRegimen) : null
  })
  const [profesores, setProfesores] = useState(() => {
    // Intentar obtener el usuario del sessionStorage al inicio
    const savedProfesores = sessionStorage.getItem('profesores')
    return savedProfesores ? JSON.parse(savedProfesores) : []
  })

  const [modulos, setModulos] = useState(() => {
    // Intentar obtener el usuario del sessionStorage al inicio
    const savedModulos = sessionStorage.getItem('modulos')
    return savedModulos ? JSON.parse(savedModulos) : []
  })

  const HORAS_SEMANALES = [20, 18]
  const MODULO_WIDTH = 144
  const MODULO_HEIGHT = 144

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
    const filteredProfesores = profesores.filter(profesor => profesor.regimen === regimen)
    const newProfesores = filteredProfesores.map(profesor => {
      return {
        ...profesor,
        horasTotal: profesor.modulos.reduce((acc, modulo) => acc + modulo.horas_semanales, 0)
      }
    })
    setFilteredProfesores(newProfesores)
  }, [profesores, regimen])

  useEffect(() => {
    sessionStorage.setItem('modulos', JSON.stringify(modulos))
    const filteredModulos = modulos.filter(modulo => modulo.regimen === regimen)
    setFilteredModulos(filteredModulos)
  }, [modulos, regimen])

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
    filteredProfesores,
    HORAS_SEMANALES,
    MODULO_WIDTH,
    MODULO_HEIGHT
  }

  return (
    <ModulosProfesoresContext.Provider value={contextValue}>
      {children}
    </ModulosProfesoresContext.Provider>
  )
}
