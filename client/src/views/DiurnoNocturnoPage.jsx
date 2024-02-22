import { Board } from '../components/Board'
import { Profesores } from '../components/Profesores'
import { ModulosProfesoresProvider } from '../context/ModulosProfesoresContext'

export function DirunoNocturnoPage () {
  return (
    <ModulosProfesoresProvider>
      <main className='bg-white grid grid-cols-[400px_1fr] h-screen text-white'>
        <Profesores />
        <Board />
      </main>
    </ModulosProfesoresProvider>
  )
}
