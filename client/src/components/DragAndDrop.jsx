/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { DragAndDropDesing } from '../components/DragAndDropDesing.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { uploadCsv } from '../service/csv.js'
import { ICONS } from '../helpers/Icons.jsx'
import { ModalContext } from '../context/ModalContext.jsx'
import { useModels } from '../hooks/useModels.jsx'

const fileTypes = ['CSV']

function DragDrop ({ urlImage, loadFile = false }) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { setModalInfo } = useContext(ModalContext)
  const { loadModelFromCSV } = useModels()

  const readCSVFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsText(file)
    })
  }

  const uploadCSV = async (file) => {
    setLoading(true)
    try {
      await uploadCsv(file, `/api/csv/upload/${user.id_departamento}`)
      setModalInfo({
        text: 'Archivo subido correctamente',
        icon: ICONS.SUCCESS
      })
    } catch (error) {
      console.error('Error al leer el archivo CSV:', error)
      setModalInfo({
        text:
          'Hubo un error al subir el archivo, compruebe su archivo e intente de nuevo',
        icon: ICONS.ERROR
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = async (file) => {
    if (!loadFile) {
      uploadCSV(file)
      return
    }

    const csvContent = await readCSVFile(file)
    loadModelFromCSV(csvContent)
  }

  return (
    <FileUploader handleChange={handleChange} name='csvFile' types={fileTypes}>
      <DragAndDropDesing urlImage={urlImage} loading={loading} />
    </FileUploader>
  )
}

export default DragDrop
