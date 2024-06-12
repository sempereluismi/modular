import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { getModulosAPI, getProfesoresAPI, getRegimenAPI } from '../service/profesores'
import { useAuth } from './useAuth'

export function useModulosProfesores () {
  const { user } = useAuth()
  const { setModulos, setProfesores, setAllRegimen, setRegimen } = useContext(ModulosProfesoresContext)
  const navigate = useNavigate()

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

  async function getModulosProfesores () {
    try {
      const regimenes = await getRegimen()
      setAllRegimen(regimenes)
      setRegimen(regimenes[0].tipo)

      const [modulosResponse, profesoresResponse] = await Promise.all([getModulos(), getProfesores()])

      setModulos(modulosResponse)

      const newProfesores = profesoresResponse.map(profesor => ({
        ...profesor,
        horasTotal: 0,
        info: {}
      }))
      setProfesores(newProfesores)

      const hasEmptyRegimen = comprobarRegimen(newProfesores)
      if (hasEmptyRegimen) {
        navigate('/admin/teachers-list/1')
      }
    } catch (error) {
      console.error('Error al obtener datos:', error)
    }
  }

  const comprobarRegimen = (profesores) => {
    return profesores.some(profesor => profesor.regimen === '')
  }

  return {
    getModulos,
    getProfesores,
    getRegimen,
    getModulosProfesores
  }
}
