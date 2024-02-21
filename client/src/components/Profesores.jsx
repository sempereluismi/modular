/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'

export function Profesores () {
  const { profesores, modulos } = useContext(ModulosProfesoresContext)

  return (
    <aside className='m-4 bg-neutral-200 rounded-lg text-black'>
      <ul>
        {
            profesores.map((profesor) => {
              return <Profesor key={profesor.id} profesor={profesor} modulos={modulos} />
            })
        }
      </ul>
    </aside>
  )
}

const Profesor = ({ profesor, modulos }) => {
  const { setModulos, setDraggedModulo, draggedModulo, draggedFromBoard, setDraggedFromBoard, setDraggedProfesor, profesores } = useContext(ModulosProfesoresContext)
  const [active, setActive] = useState(false)

  const handleDragOver = (event) => {
    event.preventDefault()
    setActive(true)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    if (draggedFromBoard) {
      profesor.modulos = [...profesor.modulos, draggedModulo]
      const nuevosModulos = modulos.filter(modulo => modulo.id !== draggedModulo.id)
      setModulos(nuevosModulos)
      setDraggedFromBoard(false)
    } else {
      profesores.map((profesor) => {
        return (profesor.modulos = profesor.modulos.filter(modulo => modulo.id !== draggedModulo.id))
      })
      profesor.modulos = [...profesor.modulos, draggedModulo]
    }
    setActive(false)
  }

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
      <li
        className={`px-3 py-5 
    ${active ? 'border-white border-2' : 'border-0'}`}
        onDragOver={handleDragOver}
        onDragLeave={() => setActive(false)}
        onDrop={handleDrop}
      >{profesor.nombre}
        {profesor.modulos.length > 0 &&
          <ul className='flex gap-2 flex-wrap'>
            {profesor.modulos.map(modulo => {
              return (
                <li
                  key={modulo.id} id={modulo.id}
                  className='w-12 h-12 text-black cursor-grab active:cursor-grabbing'
                  style={{ backgroundColor: modulo.color }}
                  draggable='true' onDragStart={handleDragStart} onDragEnd={handleDragEnd}
                >
                  <div className='flex justify-center items-center h-full'>
                    {modulo.nombre}
                  </div>
                </li>
              )
            })}
          </ul>}
      </li>
    </>
  )
}
