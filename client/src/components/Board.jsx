/* eslint-disable react/prop-types */
import { IconDeviceFloppy, IconFileDownload, IconFilePlus } from '@tabler/icons-react'
import { useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { usePosition } from '../hooks/usePosition'

export function Board ({ handleDownloadClick, handleSaveClick, handleNewClick }) {
  const { modulos, setDraggedModulo, draggedModulo, setModulos, draggedFromBoard, profesores, setProfesores, positions, setRegimen, allRegimen, regimen, filteredModulos } = useContext(ModulosProfesoresContext)
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

  const onHandleChange = (event) => {
    setRegimen(event.target.value)
  }
  return (
    <section className='m-4 bg-white border-4 border-gray-300 rounded-lg relative' onDragOver={handleDragOver} onDrop={handleDrop}>
      <header className='flex items-center justify-between pt-2 px-2'>
        <div className='flex items-center gap-2'>
          <button onClick={handleDownloadClick} className='rounded-md top-2 left-2 px-2 py-1 flex items-center justify-center bg-primary-100 text-white active:scale-95'>
            <IconFileDownload stroke={2} />
            <span className='font-semibold'>Descargar</span>
          </button>
          <button onClick={handleSaveClick} className='font-semibold rounded-md top-2 left-24 px-2 py-1 flex items-center justify-center bg-primary-100 text-white active:scale-95'>
            <IconDeviceFloppy stroke={2} />
            <span className='font-semibold'>Guardar</span>
          </button>
          <button onClick={handleNewClick} className='font-semibold rounded-md top-2 left-48 px-2 py-1 flex items-center justify-center bg-primary-100 text-white active:scale-95'>
            <IconFilePlus stroke={2} />
            <span className='font-semibold'>Nuevo</span>
          </button>
        </div>
        <select className='text-text-100' onChange={onHandleChange} value={regimen === null ? 'Ordinario' : regimen}>
          {
          allRegimen.map((regimen) => (
            <option key={regimen.id} value={regimen.tipo}>
              {regimen.tipo}
            </option>
          ))
        }
        </select>
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
