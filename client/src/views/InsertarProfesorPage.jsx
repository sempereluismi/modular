import CardNoteBook from '../components/CardNoteBook'
import DragAndDrop from '../components/DragAndDrop'
import { Layout } from '../layouts/Layout'

export function InsertarProfesorPage () {
  return (
    <Layout>
      <h1 className='text-3xl font-bold mb-6 text-center mt-20'>Insertar Profesor</h1>
      <main className='flex justify-center'>
        <DragAndDrop urlImage='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23cfcfcf%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-school%22%3E%3Cpath%20stroke%3D%22none%22%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M22%209l-10%20-4l-10%204l10%204l10%20-4v6%22%20%2F%3E%3Cpath%20d%3D%22M6%2010.6v5.4a6%203%200%200%200%2012%200v-5.4%22%20%2F%3E%3C%2Fsvg%3E' />
      </main>
      <section className='flex justify-center mt-[280px]'>
        <CardNoteBook text='email;password;nombre;fecha_inicio;especialidad;afin' subtext='ejemplo@ejemplo.com;1234;ejemplo;20-02-2023;programacion;programacion,sistemas' />
      </section>
    </Layout>
  )
}
