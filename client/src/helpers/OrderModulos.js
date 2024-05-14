export function setPositionsModulos (modulos, setPositions, MODULO_WIDTH, MODULO_HEIGHT, MAX_WIDTH_MODULO) {
  const padding = 10
  const margin = 80
  let column = 0
  let row = 0
  const positions = modulos.map((modulo) => {
    let x = (column) * (MODULO_WIDTH + padding) + margin
    if (x > MAX_WIDTH_MODULO) {
      column = 0
      x = (column) * (MODULO_WIDTH) + margin
      row++
    }
    const y = (row) * (MODULO_HEIGHT) + margin
    column++
    return {
      id: modulo.id,
      x,
      y
    }
  })
  setPositions(positions)
}
