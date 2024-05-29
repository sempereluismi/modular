/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { DragAndDropDesing } from '../components/DragAndDropDesing.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { uploadCsv } from '../service/csv.js'
import { ICONS } from '../helpers/Icons.jsx'
import { ModalContext } from '../context/ModalContext.jsx'
const fileTypes = ['CSV']

function DragDrop ({ urlImage }) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { setModalInfo } = useContext(ModalContext)

  const handleChange = async (file) => {
    setLoading(true)
    try {
      await uploadCsv(file, `/api/csv/upload/${user.id_departamento}`)
      setModalInfo({
        text: 'Archivo subido correctamente',
        icon: ICONS.SUCCESS
      })
    } catch (error) {
      setModalInfo({
        text: 'Hubo un error al subir el archivo, compruebe su archivo e intente de nuevo',
        icon: ICONS.ERROR
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <FileUploader handleChange={handleChange} name='csvFile' types={fileTypes}>
      <DragAndDropDesing urlImage={urlImage} loading={loading} />
    </FileUploader>
  )
}

export default DragDrop
