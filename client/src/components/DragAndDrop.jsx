/* eslint-disable react/prop-types */
import React from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { DragAndDropDesing } from '../components/DragAndDropDesing.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
const fileTypes = ['CSV']

function DragDrop ({ urlImage }) {
  const { user } = useAuth()

  const handleChange = async (file) => {
    const formData = new FormData()
    formData.append('csvFile', file)

    try {
      const response = await fetch(`http://localhost:8000/api/csv/${user.id_departamento}`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        // Aquí puedes manejar la respuesta de la API si lo deseas
      } else {
        const data = await response.json()
        console.log(data)
        console.error('Failed to upload file', data)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <FileUploader handleChange={handleChange} name='csvFile' types={fileTypes}>
      <DragAndDropDesing urlImage={urlImage} />
    </FileUploader>
  )
}

export default DragDrop
