import { API_URL } from '../helpers/constants'

export async function uploadCsv (file, url) {
  const formData = new FormData()
  formData.append('csvFile', file)

  try {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      const data = await res.json()
      return data
    }

    throw new Error()
  } catch (error) {
    throw new Error()
  }
}
