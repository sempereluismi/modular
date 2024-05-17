export function jsonToCsv (json) {
  const replacer = (key, value) => value === null ? '' : value
  const header = Object.keys(json[0])
  const csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  return csv.join('\r\n')
}
