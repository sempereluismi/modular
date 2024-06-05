import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ModelsContext } from '../context/ModelsContext'
import { Layout } from '../layouts/Layout'
import { getAdminModels, getProfesorModels } from '../service/csv'

export function InsertarPlantillaPage () {
  const { user } = useContext(AuthContext)
  const { adminModels, profesorModels, setAdminModels, setProfesorModels } = useContext(ModelsContext)

  useEffect(() => {
    Promise.all([getAdminModels(user.id_departamento), getProfesorModels(user.id)])
      .then(([adminModelsReq, profesorModelsReq]) => {
        console.log(adminModelsReq, profesorModelsReq)
        const newAdminModels = adminModelsReq.filter((model) => {
          return model.id_profesor !== user.id
        })
        setAdminModels(newAdminModels)
        setProfesorModels(profesorModelsReq)
      })
  }, [])

  return (
    <Layout>
      <h1>Insertar Plantilla</h1>

      <h2>Modelos de administrador</h2>
      <pre>{JSON.stringify(adminModels, null, 2)}</pre>
      <h2>Modelos de los profesores</h2>
      <pre>{JSON.stringify(profesorModels, null, 2)}</pre>
    </Layout>
  )
}
