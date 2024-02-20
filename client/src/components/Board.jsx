/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { usePosition } from '../hooks/usePosition'

export function Board () {
  const { modulos, setDraggedModulo, draggedModulo, setModulos, draggedFromBoard, profesores, positions } = useContext(ModulosProfesoresContext)
  const { updatePosition } = usePosition()
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()

    if (draggedFromBoard) {
      updatePosition(draggedModulo, event)
    } else {
      const nuevosModulos = [...modulos, draggedModulo]
      profesores.map((profesor) => {
        return (profesor.modulos = profesor.modulos.filter(modulo => modulo.id !== draggedModulo.id))
      })
      setModulos(nuevosModulos)
      updatePosition(draggedModulo, event)
    }

    setDraggedModulo(null)
  }

  return (
    <section className='m-4 bg-neutral-700 rounded-lg relative' onDragOver={handleDragOver} onDrop={handleDrop}>
      <ul>
        {modulos.map((modulo) => {
          return (positions.length > 0 &&
            <Modulo key={modulo.id} modulo={modulo} position={positions[modulo.id - 1]} />
          )
        })}
      </ul>
    </section>
  )
}

const Modulo = ({ modulo, position }) => {
  const { setDraggedModulo, setDraggedFromBoard } = useContext(ModulosProfesoresContext)

  const handleDragStart = () => {
    setDraggedModulo(modulo)
    setDraggedFromBoard(true)
  }

  const handleDragEnd = () => {
    setDraggedModulo(null)
    setDraggedFromBoard(false)
  }

  return (
    <div
      id={modulo.id.toString()} // Se establece el ID como el índice del módulo
      className='w-36 h-36 absolute cursor-grab active:cursor-grabbing text-black'
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, backgroundColor: modulo.color }}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h1>{modulo.nombre}</h1>
      <p>{modulo.regimen}</p>
      <p>{modulo.horasSemanales}</p>
    </div>
  )
}
