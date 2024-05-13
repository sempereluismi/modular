import { useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { useAuth } from './useAuth'

export function useModulosProfesores () {
  const { user } = useAuth()
  const { setPositions, MODULO_HEIGHT, MODULO_WIDTH } = useContext(ModulosProfesoresContext)

  async function getModulos () {
    const data = await fetch(`http://localhost:8000/api/modulos/${user.id_departamento}`)
    const modulos = await data.json()
    return modulos
  }

  async function getProfesores () {
    const data = await fetch(`http://localhost:8000/api/profesor/${user.id_departamento}`)
    const profesores = await data.json()
    const newProfesores = profesores.map((profesor) => {
      return {
        ...profesor,
        modulos: []
      }
    })
    return newProfesores
  }

  async function getRegimen () {
    const data = await fetch(`http://localhost:8000/api/regimen/${user.id_departamento}`)
    const regimenes = await data.json()
    return regimenes
  }

  function setPositionsModulos (modulos) {
    const padding = 10
    const positions = modulos.map((modulo, index) => {
      return {
        id: modulo.id,
        x: (index + 1) * (MODULO_WIDTH + padding),
        y: 50
      }
    })
    setPositions(positions)
  }

  return {
    getModulos,
    getProfesores,
    setPositionsModulos,
    getRegimen
  }
}
