import { useNavigate } from 'react-router-dom'
import { getModulosAPI, getProfesoresAPI, getRegimenAPI } from '../service/profesores'
import { useAuth } from './useAuth'
import { useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'

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
    getRegimen()
      .then((regimenes) => {
        setAllRegimen(regimenes)
        setRegimen(regimenes[0].tipo)
        Promise.all([getModulos(), getProfesores()])
          .then(([modulosResponse, profesoresResponse]) => {
            setModulos(modulosResponse)
            const newProfesores = profesoresResponse.map(profesor => {
              return {
                ...profesor,
                horasTotal: 0
              }
            })
            setProfesores(newProfesores)
            const hasEmptyRegimen = comprobarRegimen(newProfesores)
            if (hasEmptyRegimen) {
              navigate('/admin/teachers-list/1')
            }
          })
          .catch(error => {
            // Maneja cualquier error que pueda ocurrir en alguna de las peticiones
            console.error('Error al obtener módulos o profesores:', error)
          })
      })
      .catch(error => {
        console.error('Error al obtener el régimen:', error)
      })
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
