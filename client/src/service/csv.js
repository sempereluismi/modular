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

export async function getAdminModels (idDepartment) {
  try {
    const res = await fetch(`${API_URL}/api/csv/list-admin/${idDepartment}`)

    if (res.ok) {
      const data = await res.json()
      return data
    }

    throw new Error()
  } catch (error) {
    throw new Error()
  }
}

export async function getProfesorModels (idProfesor) {
  try {
    const res = await fetch(`${API_URL}/api/csv/list-profesor/${idProfesor}`)

    if (res.ok) {
      const data = await res.json()
      return data
    }

    throw new Error()
  } catch (error) {
    throw new Error()
  }
}
