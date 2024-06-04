import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { useModulosProfesores } from '../hooks/useModulosProfesores'
import { Layout } from '../layouts/Layout'
import { uploadCsv } from '../service/csv.js'

export function DirunoNocturnoPage () {
  return (
    <DirunoNocturnoContent />
  )
}

function DirunoNocturnoContent () {
  const { setModulos, setProfesores, setAllRegimen, setRegimen } = useContext(ModulosProfesoresContext)
  const { getModulos, getProfesores, getRegimen } = useModulosProfesores()
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
            const newProfesores = profesoresResponse.map(profesor => {
              return {
                ...profesor,
                horasTotal: 0
              }
            })
            setProfesores(newProfesores)
            const hasEmptyRegimen = comprobarRegimen(newProfesores)
            if (hasEmptyRegimen) {
              navigate('/admin/lista-profesores')
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
    const blob = jsonToCsvFile([filteredProfesores, filteredModulos])
    try {
      const res = await uploadCsv(blob, `/api/csv/save-model/${user.id}`)
      console.log('res', res)
    } catch (error) {
      console.error('Error al guardar el archivo CSV:', error)
    }
  }
  return (
    <main className='bg-white grid grid-cols-[300px_1fr] h-screen text-white'>
      <Profesores />
      <Board handleDownloadClick={handleDownloadClick} handleSaveClick={handleSaveClick} />
    </main>
  )
}
