import { useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { useAuth } from './useAuth'

export function useModulosProfesores () {
  const { user } = useAuth()
  const { setModulos, setPositions } = useContext(ModulosProfesoresContext)

  async function getModulos () {
    const data = await fetch(`http://localhost:8000/api/modulos/${user.id_departamento}`)
    const modulos = await data.json()
    setModulos(modulos)
    setPositionsModulos(modulos)
  }

  function setPositionsModulos (modulos) {
    const positions = modulos.map((modulo) => {
      return {
        id: modulo.id,
        x: randomInt(0, 1000),
        y: randomInt(0, 500)
      }
    })
    setPositions(positions)
  }

  function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return {
    getModulos
  }
}
