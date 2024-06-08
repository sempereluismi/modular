import { useContext, useEffect, useState } from 'react'
import { Board } from '../components/Board'
import { Loader } from '../components/Loader'
import { Profesores } from '../components/Profesores'
import '../components/css/animations.css'
import { AuthContext } from '../context/AuthContext.jsx'
import { ModalContext } from '../context/ModalContext'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { ICONS } from '../helpers/Icons.jsx'
import { downloadCsv, jsonToCsvFile } from '../helpers/ManageCsv'
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
  const { profesores, modulos } = useContext(ModulosProfesoresContext)

  const getBoardInfo = async () => {
    setLoading(true)
    try {
      await getModulosProfesores()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (profesores.length === 0 && modulos.length === 0) {
      getBoardInfo()
    }
  }, [])

  const handleNewClick = async () => {
    getBoardInfo()
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
  const { profesores, modulos } = useContext(ModulosProfesoresContext)
  const { setModalInfo } = useContext(ModalContext)
  const { user } = useContext(AuthContext)

  const handleDownloadClick = () => {
    downloadCsv([profesores, modulos])
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
