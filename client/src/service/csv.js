import { API_URL } from '../helpers/constants'

export function uploadCsv (file, url) {
  const formData = new FormData()
  formData.append('csvFile', file)

  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error()
      }
    })
    .catch(_ => {
      throw new Error()
    })
}
