/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { DragAndDropDesing } from '../components/DragAndDropDesing.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { useCsv } from '../hooks/useCsv.jsx'
const fileTypes = ['CSV']

function DragDrop ({ urlImage }) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { uploadCsv } = useCsv()

  const handleChange = async (file) => {
    setLoading(true)
    try {
      await uploadCsv(file, user.id_departamento)
    } catch (error) {
      console.error('Error uploading file:', error)
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
