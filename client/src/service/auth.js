import { API_URL } from '../helpers/constants'

export async function loginService (email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    return false
  }
}
