/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { usePosition } from '../hooks/usePosition'

export function Board () {
  const { modulos, setDraggedModulo, draggedModulo, setModulos, draggedFromBoard, profesores, positions, setRegimen, allRegimen, regimen, filteredModulos } = useContext(ModulosProfesoresContext)
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

  const onHandleChange = (event) => {
    setRegimen(event.target.value)
  }

  return (
    <section className='m-4 bg-neutral-200 rounded-lg relative' onDragOver={handleDragOver} onDrop={handleDrop}>
      <select className='absolute top-2 right-2 text-text-100' onChange={onHandleChange} value={regimen}>
        {
          allRegimen.map((regimen) => (
            <option key={regimen.id} value={regimen.tipo}>{regimen.tipo}</option>
          ))
        }
      </select>
      <ul>
        {filteredModulos.map((modulo) => {
          const moduloPosition = positions.find(pos => pos.id === modulo.id)
          return moduloPosition && (
            <Modulo key={modulo.id} modulo={modulo} position={moduloPosition} />
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
      className='w-36 h-36 absolute cursor-grab active:cursor-grabbing text-black font-postit flex flex-col justify-center items-center'
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, backgroundColor: modulo.color }}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h2 className='text-xl'>{modulo.nombre_ciclo}</h2>
      <h2 className='text-xl'>{modulo.nombre}</h2>
      <p>Régimen: {modulo.regimen}</p>
      <p>Horas: {modulo.horas_semanales}h</p>
    </div>
  )
}
