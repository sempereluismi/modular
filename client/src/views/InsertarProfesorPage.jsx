import DragAndDrop from '../components/DragAndDrop'
import { Layout } from '../layouts/Layout'

export function InsertarProfesorPage () {
  return (
    <Layout>
      <h1 className='text-3xl font-bold mb-6 text-center mt-20'>Insertar Profesor</h1>
      <main className='flex justify-center'>
        <DragAndDrop />
      </main>
    </Layout>
  )
}
