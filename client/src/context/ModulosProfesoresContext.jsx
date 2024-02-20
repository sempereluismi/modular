/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'
import modulosMook from '../mooks/modulos.json'
import profesoresMook from '../mooks/profesores.json'

// Crear el contexto
export const ModulosProfesoresContext = createContext()
// Crear el proveedor
export function ModulosProfesoresProvider ({ children }) {
  const [positions, setPositions] = useState([])
  const [modulos, setModulos] = useState(modulosMook)
  const [profesores, setProfesores] = useState(profesoresMook)
  const [draggedModulo, setDraggedModulo] = useState(null)
  const [draggedProfesor, setDraggedProfesor] = useState(null)
  const [draggedFromBoard, setDraggedFromBoard] = useState(false)

  useEffect(() => {
    const positions = modulos.map((modulo) => {
      return {
        id: modulo.id,
        x: randomInt(0, 1000),
        y: randomInt(0, 500)
      }
    })
    setPositions(positions)
  }, [])

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

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
