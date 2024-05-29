export async function uploadRegimen (profesores) {
  try {
    const res = await fetch('http://localhost:8000/api/regimen', {
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
