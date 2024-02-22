import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { DragAndDropDesing } from '../components/DragAndDropDesing.jsx'

const fileTypes = ['CSV']

function DragDrop () {
  const [file, setFile] = useState(null)
  const handleChange = (file) => {
    setFile(file)
  }
  return (
<<<<<<< HEAD
    <FileUploader handleChange={handleChange} name='csvFile' types={fileTypes}>
      {/* <div><p>this is inside drop area</p></div>  Hacer diseño del drop area */}
=======
    <FileUploader handleChange={handleChange} name='file' types={fileTypes}>
      <DragAndDropDesing />
>>>>>>> ca115d70be98608d18297403bd6b763c9030862a
    </FileUploader>
  )
}

export default DragDrop
