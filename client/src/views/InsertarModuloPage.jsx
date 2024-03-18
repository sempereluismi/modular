import DragAndDrop from '../components/DragAndDrop'
import { Layout } from '../layouts/Layout'
import CardNoteBook from '../components/CardNoteBook'

export function InsertarModuloPage () {
  return (
    <Layout>
      <h1 className='text-3xl font-bold mb-6 text-center mt-20'>Insertar Módulo</h1>
      <main className='flex justify-center'>
        <DragAndDrop urlImage='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23cfcfcf%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-book%22%3E%3Cpath%20stroke%3D%22none%22%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M3%2019a9%209%200%200%201%209%200a9%209%200%200%201%209%200%22%20%2F%3E%3Cpath%20d%3D%22M3%206a9%209%200%200%201%209%200a9%209%200%200%201%209%200%22%20%2F%3E%3Cpath%20d%3D%22M3%206l0%2013%22%20%2F%3E%3Cpath%20d%3D%22M12%206l0%2013%22%20%2F%3E%3Cpath%20d%3D%22M21%206l0%2013%22%20%2F%3E%3C%2Fsvg%3E' />
      </main>
      <section className='flex justify-center mt-[280px]'>
        <CardNoteBook />
      </section>
    </Layout>
  )
}
