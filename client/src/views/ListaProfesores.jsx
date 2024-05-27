/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { CheckBox } from '../components/CheckBox/CheckBox'
import { LoadComponent } from '../components/LoadComponent'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { Layout } from '../layouts/Layout'

export function ListaProfesores () {
  const { profesores: profesoresContext } = useContext(ModulosProfesoresContext)
  const [profesores, setProfesores] = useState([])

  useEffect(() => {
    // Inicializa el estado de los profesores con valores booleanos definidos
    const profesoresInicializados = profesoresContext.map(profesor => ({
      nombre: profesor.nombre,
      id: profesor.id,
      regimenes: 0
    }))
    setProfesores(profesoresInicializados)
  }, [profesoresContext])

  const [loading, setLoading] = useState(false)

  const handleCheckboxChange = (idProfesor, idRegimen) => {
    // TODO: CAMBIAR CODIGO PARA PODER PONER VARIOS REGIMENES
    setProfesores((prevState) => {
      const profesor = prevState.find(profesor => profesor.id === idProfesor)
      // const regimenes = profesor.regimenes
      // if (regimenes.includes(idRegimen)) {
      //   profesor.regimenes = regimenes.filter(regimen => regimen !== idRegimen)
      // } else {
      //   profesor.regimenes = [...regimenes, idRegimen]
      // }
      profesor.regimenes = idRegimen
      return [...prevState]
    })
  }

  const handleGuardar = async () => {
    const profesoresSeleccionados = profesores.map(profesor => ({
      id_profesor: profesor.id,
      id_regimenes: profesor.regimenes
    }))

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/regimen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profesoresSeleccionados)
      })

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud')
      }
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error)
    } finally {
      // setLoading(false)
    }
  }

  return (
    <Layout>
      <main className='flex flex-col items-center mt-20 gap-y-4 h-[800px]'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Selección de Régimen</h1>
        <div className='w-5 h-5 bg-red-600 rounded-full absolute top-[150px] flex items-center justify-center'>
          <div className='w-3 h-3 bg-red-500 rounded-full border border-black' />
        </div>

        <section className='w-9/12 bg-white border-4 border-black rounded-lg h-screen mt-28 animate-slide-up-fade'>
          <header>
            <div className='w-[50.9%] h-32 absolute -top-[63px] left-[660px] border-t-2 border-black transform rotate-[10deg]' />
            <div className='w-[50.9%] h-32 absolute -top-[63px] left-[6px] border-t-2 border-black transform -rotate-[10deg]' />
          </header>
          <main className='w-full h-full grid grid-cols-3 p-10'>
            <section className='justify-self-start'>Nombre</section>
            <section className='justify-self-center'>Ordinario</section>
            <section className='justify-self-center'>Adultos</section>
            <ProfesorList profesores={profesores} onCheckboxChange={handleCheckboxChange} />
            <footer className='col-span-3 flex items-center'>
              <button onClick={handleGuardar} className='flex w-[89px] h-[36px] justify-center rounded-md bg-primary-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:bg-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                {loading
                  ? (
                    <div role='status'>
                      <LoadComponent color='transparent' fill='#ffffff' />
                    </div>
                    )
                  : (
                      'Guardar'
                    )}
              </button>
            </footer>
          </main>
        </section>
      </main>
    </Layout>
  )
}

const ProfesorList = ({ profesores, onCheckboxChange }) => {
  const { allRegimen } = useContext(ModulosProfesoresContext)
  return (
    <>
      {profesores.map((profesor) => (
        <React.Fragment key={profesor.id}>
          <section className='profesor-item justify-self-start flex items-center'>{profesor.nombre}</section>
          {allRegimen.map((regimen) => (
            <section key={regimen.id} className='profesor-item justify-self-center flex items-center'>
              <CheckBox
                id={`${profesor.id}-${regimen.id}`}
                // checked={profesor.regimenes && profesor.regimenes.includes(regimen.id)}
                checked={profesor.regimenes === regimen.id}
                onChange={() => onCheckboxChange(profesor.id, regimen.id)}
              />
            </section>
          ))}
        </React.Fragment>
      ))}
    </>
  )
}
