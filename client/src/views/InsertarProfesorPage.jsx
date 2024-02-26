import DragAndDrop from '../components/DragAndDrop'
import { Layout } from '../layouts/Layout'

export function InsertarProfesorPage () {
  return (
    <Layout>
      <h1 className='text-3xl font-bold mb-6 text-center mt-20'>Insertar Profesor</h1>
      <main className='flex justify-center'>
        <DragAndDrop urlImage={'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'30\' height=\'30\' viewBox=\'0 0 24 24\' stroke-width=\'1.5\' stroke=\'%23cfcfcf\' fill=\'none\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath stroke=\'none\' d=\'M0 0h24v24H0z\' fill=\'none\'/%3E%3Cpath d=\'M22 9l-10 -4l-10 4l10 4l10 -4v6\' /%3E%3Cpath d=\'M6 10.6v5.4a6 3 0 0 0 12 0v-5.4\' /%3E%3C/svg%3E'} />
      </main>
    </Layout>
  )
}
