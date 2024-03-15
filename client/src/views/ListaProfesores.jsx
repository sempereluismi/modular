import { useContext, useEffect, useState } from 'react'
import { Board } from '../components/Board'
import { Loader } from '../components/Loader'
import { Profesores } from '../components/Profesores'
import { ModulosProfesoresContext, ModulosProfesoresProvider } from '../context/ModulosProfesoresContext'
import { useModulosProfesores } from '../hooks/useModulosProfesores'
import { Layout } from '../layouts/Layout'

export function ListaProfesores () {
  return (
    <ModulosProfesoresProvider>
      <ProfesoresContent />
    </ModulosProfesoresProvider>
  )
}

function ProfesoresContent () {
  const { setModulos, setProfesores, setAllRegimen, setRegimen, regimen, setFilteredModulos } = useContext(ModulosProfesoresContext)
  const { getModulos, getProfesores, setPositionsModulos, getRegimen } = useModulosProfesores()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getRegimen()
      .then((regimenes) => {
        setAllRegimen(regimenes)
        setRegimen(regimenes[0].tipo)
        Promise.all([getModulos(), getProfesores()])
          .then(([modulosResponse, profesoresResponse]) => {
            // Aquí puedes manejar las respuestas de ambas funciones
            setModulos(modulosResponse)
            setPositionsModulos(modulosResponse)
            setProfesores(profesoresResponse)
            const filtered = modulosResponse.filter(modulo => modulo.regimen === regimen)
            setFilteredModulos(filtered)
            setLoading(false)
          })
          .catch(error => {
            // Maneja cualquier error que pueda ocurrir en alguna de las peticiones
            console.error('Error al obtener módulos o profesores:', error)
          })
      })
      .catch(error => {
        console.error('Error al obtener el régimen:', error)
      })
  }, [])

  return (
    <Layout>
      <>
        {loading ? <Loader /> : <BoardEntero />}
      </>
    </Layout>
  )
}
const BoardEntero = () => {
  return (
    <main className='bg-white grid grid-cols-[300px_1fr] h-screen text-white'>
      <Profesores />
      <Board />
    </main>
  )
}
