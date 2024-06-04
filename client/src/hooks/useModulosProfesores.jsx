import { useAuth } from './useAuth'
import { getModulosAPI, getProfesoresAPI, getRegimenAPI } from '../service/profesores'

export function useModulosProfesores () {
  const { user } = useAuth()

  async function getModulos () {
    try {
      return await getModulosAPI(user.id_departamento)
    } catch (error) {
      throw new Error(error)
    }
  }

  async function getProfesores () {
    try {
      return getProfesoresAPI(user.id_departamento)
    } catch (error) {
      throw new Error()
    }
  }

  async function getRegimen () {
    try {
      return getRegimenAPI(user.id_departamento)
    } catch (error) {
      throw new Error()
    }
  }

  return {
    getModulos,
    getProfesores,
    getRegimen
  }
}
