/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import { checkProfesores } from '../helpers/CheckProfesores'
import { setPositionsModulos } from '../helpers/OrderModulos'

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

  const MODULO_WIDTH = 100
  const MODULO_HEIGHT = 100
  const MAX_WIDTH_MODULO = 1300

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
    // Verificar profesores y actualizar el estado si ha cambiado
    const profesresWithInfo = checkProfesores(profesores)
    const profesoresString = JSON.stringify(profesores)
    const profesresWithInfoString = JSON.stringify(profesresWithInfo)

    if (profesoresString !== profesresWithInfoString) {
      setProfesores(profesresWithInfo)
    }
  }, [profesores])

  // Primer useEffect para calcular horasTotales de profesores
  useEffect(() => {
    const newProfesores = profesores.map(profesor => ({
      ...profesor,
      horasTotal: profesor.modulos.reduce((acc, modulo) => acc + modulo.horas_semanales, 0)
    }))

    if (JSON.stringify(newProfesores) !== JSON.stringify(profesores)) {
      setProfesores(newProfesores)
    }
  }, [filteredProfesores, profesores])

  useEffect(() => {
    sessionStorage.setItem('profesores', JSON.stringify(profesores))
    const filteredProfesores = profesores.filter(profesor => profesor.regimen === regimen)
    setFilteredProfesores(filteredProfesores)
  }, [profesores, regimen])

  useEffect(() => {
    sessionStorage.setItem('modulos', JSON.stringify(modulos))
    const filteredModulos = modulos.filter(modulo => modulo.regimen === regimen)
    setPositionsModulos(filteredModulos, setPositions, MODULO_WIDTH, MODULO_HEIGHT, MAX_WIDTH_MODULO)
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
    MODULO_WIDTH,
    MODULO_HEIGHT,
    MAX_WIDTH_MODULO
  }

  return (
    <ModulosProfesoresContext.Provider value={contextValue}>
      {children}
    </ModulosProfesoresContext.Provider>
  )
}
