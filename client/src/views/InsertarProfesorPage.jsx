import DragAndDrop from '../components/DragAndDrop'
import CardNoteBook from '../components/CardNoteBook'
import { Layout } from '../layouts/Layout'

export function InsertarProfesorPage () {
  return (
    <Layout>
      <h1 className='text-3xl font-bold mb-6 text-center mt-20'>Insertar Profesor</h1>
      <main className='flex justify-center'>
        <DragAndDrop />
      </main>
      <section className='flex justify-center mt-[280px]'>
        <CardNoteBook />
      </section>
    </Layout>
  )
}
