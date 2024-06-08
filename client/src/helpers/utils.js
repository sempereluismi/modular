import { COLORS } from './constants'

export function getRandomColors (numColors) {
  const colorValues = Object.values(COLORS)
  const randomColors = []

  while (randomColors.length < numColors) {
    const randomIndex = Math.floor(Math.random() * colorValues.length)
    const selectedColor = colorValues[randomIndex]
    if (!randomColors.includes(selectedColor)) {
      randomColors.push(selectedColor)
    }
  }

  return randomColors
}

export function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
