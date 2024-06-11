export function jsonToCsv (arrayJson) {
  const csv = []

  // Define the manual header for empty JSONs
  const manualHeader = 'id;nombre;color;especialidad;horas_semanales;regimen;nombre_ciclo'

  arrayJson.forEach(json => {
    const items = json
    if (items.length === 0) {
      // Add manual header for empty JSONs
      csv.push(manualHeader)
    } else {
      const header = Object.keys(items[0])
      csv.push(header.join(';'))

      items.forEach(item => {
        const row = header.map(fieldName => JSON.stringify(item[fieldName] || '', (key, value) => value === null ? '' : value))
        csv.push(row.join(';'))
      })
    }
  })

  return csv.join('\r\n')
}

export function jsonToFileCsv (csvText, fileName) {
  // Crea un Blob con el contenido CSV y el tipo MIME 'text/csv'
  const blob = new Blob([csvText], { type: 'text/csv' })

  // Retorna el Blob con las opciones especificadas
  return new File([blob], fileName || 'modulos.csv', { type: 'text/csv' })
}

export function downloadCsv (arrayJson) {
  const csvText = jsonToCsv(arrayJson)
  const blob = jsonToFileCsv(csvText)
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = new Date().toISOString().split('T')[0]
  const fileName = `modelo-${date}.csv`

  a.setAttribute('hidden', '')
  a.setAttribute('href', url)
  a.setAttribute('download', fileName)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

export function jsonToCsvFile (json) {
  const csvText = jsonToCsv(json)
  return jsonToFileCsv(csvText)
}

export function csvTextToJson (text) {
  const sections = text.split('\r\nid;nombre;')
  const result = []

  sections.forEach((section, index) => {
    if (index !== 0) {
      section = 'id;nombre;' + section
    }
    const [header, ...rows] = section.trim().split('\r\n')
    const keys = header.split(';')
    const objects = rows.map(row => {
      const values = row.split(';').map(value => value.replace(/^"|"$/g, ''))
      return keys.reduce((obj, key, i) => {
        let value = values[i]
        // Attempt to parse as JSON for arrays and objects
        try {
          value = JSON.parse(value)
        } catch (e) {
          // If parsing fails, leave the value as a string
        }
        obj[key] = value
        return obj
      }, {})
    })

    result.push(objects)
  })

  return result
}
