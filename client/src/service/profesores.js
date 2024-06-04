import { API_URL } from '../helpers/constants'

export async function uploadRegimen (profesores) {
  try {
    const res = await fetch(`${API_URL}/api/regimen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profesores)
    })

    if (!res.ok) {
      throw new Error()
    }
  } catch (error) {
    throw new Error()
  }
}

export async function getModulosAPI (idDepartamento) {
  try {
    const data = await fetch(`${API_URL}/api/modulos/${idDepartamento}`)
    const modulos = await data.json()
    return modulos
  } catch (error) {
    throw new Error()
  }
}

export async function getProfesoresAPI (idDepartamento) {
  try {
    const data = await fetch(`${API_URL}/api/profesor/${idDepartamento}`)
    const profesores = await data.json()
    const newProfesores = profesores.map((profesor) => {
      return {
        ...profesor,
        modulos: []
      }
    })
    return newProfesores
  } catch (error) {
    throw new Error()
  }
}

export async function getRegimenAPI (idDepartamento) {
  try {
    const data = await fetch(`${API_URL}/api/regimen/${idDepartamento}`)
    const regimenes = await data.json()
    return regimenes
  } catch (error) {
    throw new Error()
  }
}
