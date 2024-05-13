import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Board } from '../components/Board'
import { Loader } from '../components/Loader'
import { Modal } from '../components/Modal'
import { Profesores } from '../components/Profesores'
import '../components/css/animations.css'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { comprobarHoras } from '../helpers/CheckProfesores'
import { useModulosProfesores } from '../hooks/useModulosProfesores'
import { Layout } from '../layouts/Layout'

export function DirunoNocturnoPage () {
  return (
    <DirunoNocturnoContent />
  )
}

function DirunoNocturnoContent () {
  const { setModulos, setProfesores, setAllRegimen, setRegimen } = useContext(ModulosProfesoresContext)
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
            const newProfesores = profesoresResponse.map(profesor => {
              return {
                ...profesor,
                horasTotal: 0
              }
            })
            setProfesores(newProfesores)
            const hasEmptyRegimen = comprobarRegimen(newProfesores)
            if (hasEmptyRegimen) {
              navigate('/admin/listaProfesores')
            }
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
  const { filteredProfesores, filteredModulos } = useContext(ModulosProfesoresContext)
  const [showModal, setShowModal] = useState(null)

  const onCloseModal = () => {
    setShowModal(null)
  }

  const handleSaveClick = () => {
    if (filteredModulos.length > 0) {
      setShowModal('Tienes que añadir todos los modulos a los profesores antes de exportar el archivo')
      return
    }

    const hasEmptyHoras = comprobarHoras(filteredProfesores)
    if (hasEmptyHoras) {
      setShowModal('Los profesores tienen que estar entre 18 y 20 horas semanales')
    }
  }
  return (
    <main className='bg-white grid grid-cols-[300px_1fr] h-screen text-white'>
      <Profesores />
      <Board handleSaveClick={handleSaveClick} />
      <Modal isOpen={showModal} onClose={onCloseModal}>
        <p className='text-2xl text-center'>{showModal}</p>
      </Modal>
    </main>
  )
}
