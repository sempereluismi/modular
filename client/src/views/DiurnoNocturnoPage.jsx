import { useContext, useEffect, useState } from 'react'
import { Board } from '../components/Board'
import { Loader } from '../components/Loader'
import { ModalProfesores } from '../components/ModalProfesores.jsx'
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
  const [profesoresInfo, setProfesoresInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleDownloadClick = () => {
    const profesoresNewInfo = profesores.map(profesor => {
      const filteredInfo = Object.keys(profesor.info).reduce((acc, key) => {
        if (profesor.info[key] !== null) {
          acc[key] = profesor.info[key]
        }
        return acc
      }, {})
      const infoIsEmpty = Object.keys(filteredInfo).length === 0
      if (!infoIsEmpty) {
        return {
          nombre: profesor.nombre,
          info: filteredInfo
        }
      }
      return null
    }).filter(profesor => profesor !== null)
    setProfesoresInfo(profesoresNewInfo)
    setShowModal(true)
  }

  const handleDownloadCsv = () => {
    downloadCsv([profesores, modulos])
    setShowModal(false)
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

  const onCloseModal = () => {
    setProfesoresInfo([])
    setShowModal(false)
  }

  return (
    <main className='bg-white grid grid-cols-[300px_1fr] h-screen text-white'>
      <Profesores />
      <Board handleDownloadClick={handleDownloadClick} handleSaveClick={handleSaveClick} handleNewClick={handleNewClick} />
      <ModalProfesores profesoresInfo={profesoresInfo} showModal={showModal} onCloseModal={onCloseModal} handleDownloadCsv={handleDownloadCsv} />
    </main>
  )
}
