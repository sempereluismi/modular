export function jsonToCsv (data) {
  const csv = data.map(row => Object.values(row).join(',')).join('\n')
  return csv
}
