import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ModelsContext } from '../context/ModelsContext'
import { Layout } from '../layouts/Layout'
import { useModels } from '../hooks/useModels'
import DragDrop from '../components/DragAndDrop'

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

        <section className='w-[800px]'>
          <h2>ADMINISTRADOR</h2>
          <ShowModels models={adminModels} />
        </section>
        <section className='w-[800px]'>
          <h2>TUS PLANTILLAS</h2>
          <div className='h-[300px] flex flex-col items-center gap-1 overflow-y-auto'>
            <ShowModels models={profesorModels} />
          </div>
          <div className='w-full flex flex-col items-center mt-10'>
            <h2 className='self-start mb-5'>CARGAR PLANTILLA</h2>
            <DragDrop loadFile urlImage='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23dcdcdc%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-file-upload%22%3E%3Cpath%20stroke%3D%22none%22%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M14%203v4a1%201%200%200%200%201%201h4%22%2F%3E%3Cpath%20d%3D%22M17%2021h-10a2%202%200%200%201%20-2%20-2v-14a2%202%200%200%201%202%20-2h7l5%205v11a2%202%200%200%201%20-2%202z%22%2F%3E%3Cpath%20d%3D%22M12%2011v6%22%2F%3E%3Cpath%20d%3D%22M9.5%2013.5l2.5%20-2.5l2.5%202.5%22%2F%3E%3C%2Fsvg%3E' />
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
        <div className='cursor-pointer w-full bg-white border-[1px] border-gray-300 flex justify-between px-4 py-2 rounded-lg hover:bg-gray-300' key={model.id} onClick={handleClick(model.id)}>
          <div>{model.nombre}</div>
          <div>{model.create_date}</div>
        </div>
      ))}
    </>
  )
}
