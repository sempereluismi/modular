/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { MAX_HORAS_SEMANALES, MIN_HORAS_SEMANALES } from '../helpers/constants'

export function Profesores () {
  const { filteredProfesores, modulos } = useContext(ModulosProfesoresContext)
  return (
    <aside className='m-4 bg-white border-4 border-gray-300 rounded-lg text-black flex justify-center select-none'>
      <ul>
        {
            filteredProfesores.map((profesor) => {
              return <Profesor key={profesor.id} profesor={profesor} modulos={modulos} />
            })
        }
      </ul>
    </aside>
  )
}

const Profesor = ({ profesor, modulos }) => {
  const { setModulos, draggedModulo, draggedFromBoard, setDraggedFromBoard, profesores, setProfesores } = useContext(ModulosProfesoresContext)
  const [active, setActive] = useState(false)

  const handleDragOver = (event) => {
    event.preventDefault()
    setActive(true)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    if (draggedFromBoard) {
      const nuevosModulos = modulos.filter(modulo => modulo.id !== draggedModulo.id)
      setModulos(nuevosModulos)
      const newProfesores = profesores.map(profesorMap => {
        if (profesorMap.id === profesor.id) {
          return {
            ...profesor,
            modulos: [...profesor.modulos, draggedModulo]
          }
        }
        return profesorMap
      })
      setProfesores(newProfesores)
      setDraggedFromBoard(false)
    } else {
      const newProfesores = profesores.map(profesorMap => {
        if (profesorMap.id === profesor.id) {
          const sameModulo = profesorMap.modulos.some(modulo => modulo.id === draggedModulo.id)
          if (sameModulo) {
            return profesorMap
          }
          return {
            ...profesorMap,
            modulos: [...profesorMap.modulos, draggedModulo]
          }
        }
        return {
          ...profesorMap,
          modulos: profesorMap.modulos.filter(modulo => modulo.id !== draggedModulo.id)
        }
      })
      setProfesores(newProfesores)
    }
    setActive(false)
  }

  return (
    <>
      <li
        className={` py-5 transition-all duration-100 
        ${active && 'bg-neutral-300'}  `}
        onDragOver={handleDragOver}
        onDragLeave={() => setActive(false)}
        onDrop={handleDrop}
      >
        <div className='flex justify-between'>
          <div className='flex align-center gap-x-2'>
            <div className={'h-6 w-1 rounded-sm ' +
            (profesor.horasTotal > MAX_HORAS_SEMANALES ? 'bg-red-700 ' : '') +
            (profesor.horasTotal < MIN_HORAS_SEMANALES ? 'bg-yellow-400 ' : '') +
            (profesor.horasTotal >= MIN_HORAS_SEMANALES && profesor.horasTotal <= MAX_HORAS_SEMANALES ? 'bg-green-700 ' : '')}
            />

            {profesor.nombre}
          </div>
          <div>
            {profesor.horasTotal ? profesor.horasTotal : 0} h
          </div>
        </div>
        <MiniModulo profesor={profesor} />
      </li>
      <hr className='w-56  border-slate-700' />
    </>
  )
}

const MiniModulo = ({ profesor }) => {
  const { setDraggedModulo, setDraggedProfesor } = useContext(ModulosProfesoresContext)
  const handleDragStart = (event) => {
    const modulo = profesor.modulos.find(modulo => modulo.id === parseInt(event.target.id))
    setDraggedModulo(modulo)
    setDraggedProfesor(profesor)
  }

  const handleDragEnd = () => {
    setDraggedModulo(null)
  }
  return (
    <>
      {profesor.modulos.length > 0 &&
        <ul className='flex gap-2 flex-wrap mt-1'>
          {profesor.modulos.map(modulo => {
            return (
              <li
                key={modulo.id} id={modulo.id}
                className='font-postit w-12 h-12 text-black cursor-grab active:cursor-grabbing animate-zoom-in animate-duration-[200ms]'
                style={{ backgroundColor: modulo.color }}
                draggable='true' onDragStart={handleDragStart} onDragEnd={handleDragEnd}
              >
                <div className='flex flex-col justify-center items-center h-full'>
                  <p>{modulo.nombre}</p>
                  <p className='text-sm'>{modulo.horas_semanales}h</p>
                </div>
              </li>
            )
          })}
        </ul>}
    </>
  )
}
