import { useContext } from 'react'
import { ModelsContext } from '../context/ModelsContext'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { csvTextToJson } from '../helpers/ManageCsv'
import { getAdminModels, getProfesorModels } from '../service/csv'
import { useNavigate } from 'react-router-dom'
import { useModulosProfesores } from './useModulosProfesores'

export function useModels () {
  const { adminModels, setAdminModels, profesorModels, setProfesorModels } = useContext(ModelsContext)
  const { setModulos, setProfesores, setAllRegimen, setRegimen } = useContext(ModulosProfesoresContext)
  const { getRegimen } = useModulosProfesores()
  const navigate = useNavigate()

  function loadModels (user) {
    Promise.all([getAdminModels(user.id_departamento), getProfesorModels(user.id), getRegimen()])
      .then(([adminModelsRes, profesorModelsRes, regimenRes]) => {
        const newAdminModels = adminModelsRes.filter((model) => {
          return model.id_profesor !== user.id
        })
        setAdminModels(newAdminModels)
        setProfesorModels(profesorModelsRes)
        setAllRegimen(regimenRes)
        setRegimen(regimenRes[0].tipo)
      })
  }

  function loadModel (id) {
    let model = profesorModels.find((model) => model.id === id)
    if (!model) {
      model = adminModels.find((model) => model.id === id)
    }
    const [profesores, modulos] = csvTextToJson(model.file)
    setProfesores(profesores)
    setModulos(modulos)
    navigate('/user/model')
  }

  return {
    adminModels,
    profesorModels,
    loadModels,
    loadModel
  }
}
