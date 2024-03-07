import { useEffect } from 'react'
import { Board } from '../components/Board'
import { Profesores } from '../components/Profesores'
import { ModulosProfesoresProvider } from '../context/ModulosProfesoresContext'
import { useModulosProfesores } from '../hooks/useModulosProfesores'
import { Layout } from '../layouts/Layout'

export function DirunoNocturnoPage () {
  return (
    <ModulosProfesoresProvider>
      <DirunoNocturnoContent />
    </ModulosProfesoresProvider>
  )
}

function DirunoNocturnoContent () {
  const { getModulos } = useModulosProfesores() // Ahora useModulosProfesores se invoca dentro del proveedor de contexto

  useEffect(() => {
    getModulos() // Llamamos a getModulos dentro del useEffect
  }, [])

  return (
    <Layout>
      <main className='bg-white grid grid-cols-[300px_1fr] h-screen text-white'>
        <Profesores />
        <Board />
      </main>
    </Layout>
  )
}
