import { useContext, useState } from 'react'
import { Board } from '../components/Board'
import { Loader } from '../components/Loader'
import { Profesores } from '../components/Profesores'
import '../components/css/animations.css'
import { AuthContext } from '../context/AuthContext.jsx'
import { ModalContext } from '../context/ModalContext'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { checkProfesores } from '../helpers/CheckProfesores'
import { ICONS } from '../helpers/Icons.jsx'
import { jsonToCsvFile } from '../helpers/ManageCsv'
import { useModulosProfesores } from '../hooks/useModulosProfesores.jsx'
import { Layout } from '../layouts/Layout'
import { uploadCsv } from '../service/csv.js'

export function DirunoNocturnoPage () {
  return (
    <DirunoNocturnoContent />
  )
}

function DirunoNocturnoContent () {
  const [loading, setLoading] = useState(false)
  const { getModulosProfesores } = useModulosProfesores()

  const handleNewClick = () => {
    setLoading(true)
    getModulosProfesores().then(() => setLoading(false))
  }
  return (
    <Layout>
      <>
        {loading ? <Loader /> : <BoardEntero handleNewClick={handleNewClick} />}
      </>
    </Layout>
  )
}

const BoardEntero = ({ handleNewClick }) => {
  const { filteredProfesores, filteredModulos, profesores, modulos } = useContext(ModulosProfesoresContext)
  const { setModalInfo } = useContext(ModalContext)
  const { user } = useContext(AuthContext)

  const handleDownloadClick = () => {
    if (filteredModulos.length > 0) {
      setModalInfo({
        text: 'Tienes que añadir todos los modulos a los profesores antes de exportar el archivo',
        icon: ICONS.ERROR
      })
      return
    }

    const correctData = checkProfesores(filteredProfesores)
    if (correctData !== '') {
      // TODO: CORREGIR INFO QUE SE MUESTRA POR EL MODAL
      // A PARTE DE MOSTRAR EL MOODAL SE TIENE QUE GUARDAR EL CSV EN LA BASE DE DATOS
      setModalInfo(correctData)
    }
  }

  const handleSaveClick = async () => {
    const blob = jsonToCsvFile([profesores, modulos])
    uploadCsv(blob, `/api/csv/save-model/${user.id}`).then(() => {
      setModalInfo({
        text: 'Archivo guardado correctamente',
        icon: ICONS.SUCCESS
      })
    })
      .catch(() => {
        setModalInfo({
          text: 'Error al guardar el archivo',
          icon: ICONS.ERROR
        })
      })
  }

  return (
    <main className='bg-white grid grid-cols-[300px_1fr] h-screen text-white'>
      <Profesores />
      <Board handleDownloadClick={handleDownloadClick} handleSaveClick={handleSaveClick} handleNewClick={handleNewClick} />
    </main>
  )
}
