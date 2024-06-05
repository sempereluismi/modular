import { useContext, useEffect } from 'react'
import { Layout } from '../layouts/Layout'
import { getAdminModels, getProfesorModels } from '../service/csv'
import { AuthContext } from '../context/AuthContext'

export function InsertarPlantillaPage () {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    Promise.all([getAdminModels(user.id_departamento), getProfesorModels(user.id)])
      .then(([adminModels, profesorModels]) => {
        console.log(adminModels, profesorModels)
      })
  }, [])

  return (
    <Layout>
      <h1>Insertar Plantilla</h1>
    </Layout>
  )
}
