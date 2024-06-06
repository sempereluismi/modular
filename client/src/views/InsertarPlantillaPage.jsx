import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ModelsContext } from '../context/ModelsContext'
import { Layout } from '../layouts/Layout'
import { useModels } from '../hooks/useModels'

export function InsertarPlantillaPage () {
  const { user } = useContext(AuthContext)
  const { loadModels } = useModels()
  const { adminModels, profesorModels } = useContext(ModelsContext)

  useEffect(() => {
    loadModels(user)
  }, [])

  return (
    <Layout>
      <main className='flex flex-col items-center mt-20 gap-y-4'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Cargar Plantilla</h1>

        <section>
          <h2>ADMINISTRADOR</h2>
          <ShowModels models={adminModels} />
        </section>
        <section>
          <h2>TUS PLANTILLAS</h2>
          <div className='h-[300px] flex flex-col items-center gap-1 overflow-y-auto'>
            <ShowModels models={profesorModels} />
          </div>
        </section>
      </main>
    </Layout>
  )
}

const ShowModels = ({ models }) => {
  const { loadModel } = useModels()
  const handleClick = (id) => () => {
    loadModel(id)
  }
  return (
    <>
      {models.map((model) => (
        <div className='cursor-pointer w-[800px] bg-white border-[1px] border-gray-300 flex justify-between px-4 py-2 rounded-lg hover:bg-gray-300' key={model.id} onClick={handleClick(model.id)}>
          <div>{model.nombre}</div>
          <div>{model.create_date}</div>
        </div>
      ))}
    </>
  )
}
