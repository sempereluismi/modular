export function useCsv () {
  function uploadCsv (file, idDepartamento) {
    const formData = new FormData()
    formData.append('csvFile', file)

    return fetch(`http://localhost:8000/api/csv/upload/${idDepartamento}`, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          return response.json()
            .then(data => console.log('File uploaded:', data))
        } else {
          return response.json()
            .then(data => {
              throw new Error('Failed to upload file:', data.message || 'Unknown error')
            })
        }
      })
      .catch(_ => {
        throw new Error('Error uploading file')
      })
  }

  return {
    uploadCsv
  }
}
