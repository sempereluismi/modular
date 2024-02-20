import { useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'

export function usePosition () {
  const { setPositions } = useContext(ModulosProfesoresContext)

  function updatePosition (modulo, event) {
    const draggedItemRect = document.getElementById(modulo.id).getBoundingClientRect()
    const rect = event.target.getBoundingClientRect()
    const x = (event.clientX - (draggedItemRect.width / 2)) - rect.left
    const y = (event.clientY - (draggedItemRect.height / 2)) - rect.top

    setPositions(prevPositions => {
      const updatedPositions = prevPositions.map(position => {
        if (position.id === modulo.id) {
          return {
            ...position,
            x,
            y
          }
        }
        return position
      })
      return updatedPositions
    })
  }

  return {
    updatePosition
  }
}
