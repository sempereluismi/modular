import { useAuth } from './useAuth'

export function useModulosProfesores () {
  const { user } = useAuth()

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

  return {
    getModulos,
    getProfesores,
    getRegimen
  }
}
