/* eslint-disable react/prop-types */
import { IconDeviceFloppy, IconFileDownload, IconFilePlus } from '@tabler/icons-react'
import { useContext, useEffect, useState } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { getRandomColors } from '../helpers/utils'
import { usePosition } from '../hooks/usePosition'
import { SelectRegimen } from './SelectRegimen'

export function Board ({ handleDownloadClick, handleSaveClick, handleNewClick }) {
  const { modulos, setDraggedModulo, draggedModulo, setModulos, draggedFromBoard, profesores, setProfesores, positions, filteredModulos } = useContext(ModulosProfesoresContext)
  const { updatePosition } = usePosition()
  const [randomColors, setRandomColors] = useState([])

  useEffect(() => {
    setRandomColors(getRandomColors(3))
  }, [])

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()

    if (draggedFromBoard) {
      updatePosition(draggedModulo, event)
    } else {
      const nuevosModulos = [...modulos, draggedModulo]
      let newProfesores = profesores.map((profesor) => {
        return {
          ...profesor,
          modulos: profesor.modulos.filter(modulo => modulo.id !== draggedModulo.id)
        }
      })
      newProfesores = newProfesores.map((profesor) => {
        return {
          ...profesor,
          horasTotal: profesor.modulos.reduce((acc, modulo) => acc + modulo.horas_semanales, 0)
        }
      })
      setModulos(nuevosModulos)
      setProfesores(newProfesores)
      updatePosition(draggedModulo, event)
    }

    setDraggedModulo(null)
  }
  return (
    <section className='m-4 bg-white border-4 border-gray-300 rounded-lg relative' onDragOver={handleDragOver} onDrop={handleDrop}>
      <header className='flex items-center justify-between pt-2 px-2'>
        <div className='flex items-center gap-2'>
          <button
            onClick={handleDownloadClick} className='relative group grid place-items-center w-10 h-10 text-black cursor-pointer animate-duration-[100ms] hover:animate-jiggle rotate-3' style={{
              backgroundColor: randomColors[0]
            }}
          >
            <IconFileDownload />
            <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 z-10'>
              Descargar
            </span>
          </button>

          <button
            onClick={handleSaveClick} className='relative group grid place-items-center w-10 h-10 text-black cursor-pointer animate-duration-[100ms] hover:animate-jiggle -rotate-2' style={{
              backgroundColor: randomColors[1]
            }}
          >
            <IconDeviceFloppy />
            <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 z-10'>
              Guardar
            </span>
          </button>

          <button
            onClick={handleNewClick} className='relative group grid place-items-center bg-[#f9b7ff] w-10 h-10 text-black cursor-pointer animate-duration-[100ms] hover:animate-jiggle -rotate-3' style={{
              backgroundColor: randomColors[2]
            }}
          >
            <IconFilePlus />
            <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 z-10'>
              Nuevo
            </span>
          </button>

        </div>
        <SelectRegimen />
      </header>
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
  const { setDraggedModulo, setDraggedFromBoard, MODULO_WIDTH, MODULO_HEIGHT } = useContext(ModulosProfesoresContext)

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
      className='absolute cursor-grab active:cursor-grabbin text-black font-postit flex flex-col justify-center items-center'
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, backgroundColor: modulo.color, width: `${MODULO_WIDTH}px`, height: `${MODULO_HEIGHT}px` }}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h2 className='text-xl'>{modulo.nombre_ciclo}</h2>
      <h2 className='text-xl'>{modulo.nombre}</h2>
      <p>Horas: {modulo.horas_semanales}h</p>
    </div>
  )
}
