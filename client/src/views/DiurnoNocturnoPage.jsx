import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Board } from '../components/Board'
import { Loader } from '../components/Loader'
import { Profesores } from '../components/Profesores'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { useModulosProfesores } from '../hooks/useModulosProfesores'
import { Layout } from '../layouts/Layout'

export function DirunoNocturnoPage () {
  return (
    <DirunoNocturnoContent />
  )
}

function DirunoNocturnoContent () {
  const { setModulos, setProfesores, setAllRegimen, setRegimen, setFilteredModulos, setFilteredProfesores } = useContext(ModulosProfesoresContext)
  const { getModulos, getProfesores, setPositionsModulos, getRegimen } = useModulosProfesores()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getRegimen()
      .then((regimenes) => {
        setAllRegimen(regimenes)
        setRegimen(regimenes[0].tipo)
        Promise.all([getModulos(), getProfesores()])
          .then(([modulosResponse, profesoresResponse]) => {
            setModulos(modulosResponse)
            setPositionsModulos(modulosResponse)
            setProfesores(profesoresResponse)
            const hasEmptyRegimen = comprobarRegimen(profesoresResponse)
            if (hasEmptyRegimen) {
              navigate('/admin/listaProfesores')
            } else {
              const filteredModulos = modulosResponse.filter(modulo => modulo.regimen === regimenes[0].tipo)
              setFilteredModulos(filteredModulos)
              const filteredProfesores = profesoresResponse.filter(profesor => profesor.regimen === regimenes[0].tipo)
              setFilteredProfesores(filteredProfesores)
              setLoading(false)
            }
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

  const comprobarRegimen = (profesores) => {
    return profesores.some(profesor => profesor.regimen === '')
  }

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
