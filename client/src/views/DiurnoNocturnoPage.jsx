import { useEffect } from 'react'
import { Board } from '../components/Board'
import { Profesores } from '../components/Profesores'
import { ModulosProfesoresProvider } from '../context/ModulosProfesoresContext'
import { Layout } from '../layouts/Layout'
import { useAuth } from '../hooks/useAuth'

export function DirunoNocturnoPage () {
  const { redirectIfNotLogged } = useAuth()
  useEffect(() => {
    redirectIfNotLogged('/login')
  }, [])

  return (
    <ModulosProfesoresProvider>
      <Layout>
        <main className='bg-white grid grid-cols-[300px_1fr] h-screen text-white'>
          <Profesores />
          <Board />
        </main>
      </Layout>
    </ModulosProfesoresProvider>
  )
}
