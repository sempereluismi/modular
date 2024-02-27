import DragAndDrop from '../components/DragAndDrop'
import CardNoteBook from '../components/CardNoteBook'
import { Layout } from '../layouts/Layout'

export function InsertarProfesorPage () {
  return (
    <Layout>
      <h1 className='text-3xl font-bold mb-6 text-center mt-20'>Insertar Profesor</h1>
      <main className='flex justify-center'>
        <DragAndDrop urlImage={'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' stroke-width=\'1.5\' stroke=\'%23e3e3e3\' fill=\'none\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath stroke=\'none\' d=\'M0 0h24v24H0z\' fill=\'none\'/%3E%3Cpath d=\'M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0\' /%3E%3Cpath d=\'M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0\' /%3E%3Cpath d=\'M3 6l0 13\' /%3E%3Cpath d=\'M12 6l0 13\' /%3E%3Cpath d=\'M21 6l0 13\' /%3E%3C/svg%3E'} />
      </main>
      <section className='flex justify-center mt-[280px]'>
        <CardNoteBook />
      </section>
    </Layout>
  )
}
