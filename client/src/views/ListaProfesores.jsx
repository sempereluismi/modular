/* eslint-disable react/prop-types */
import { IconChevronLeft } from '@tabler/icons-react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckBox } from '../components/CheckBox/CheckBox'
import { LoadComponent } from '../components/LoadComponent'
import { ModalContext } from '../context/ModalContext'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { ICONS } from '../helpers/Icons'
import { Layout } from '../layouts/Layout'
import { uploadRegimen } from '../service/profesores'

export function ListaProfesores () {
  const { profesores: profesoresContext } = useContext(ModulosProfesoresContext)
  const [profesores, setProfesores] = useState([])
  const [loading, setLoading] = useState(false)
  const pageSize = 8
  const { setModalInfo } = useContext(ModalContext)

  const { page } = useParams()
  const navigate = useNavigate()
  const maxPage = Math.ceil(profesoresContext.length / pageSize)
  const buttons = Array.from({ length: maxPage }, (v, i) => i + 1)

  useEffect(() => {
    if (parseInt(page) > maxPage) {
      navigate(`/admin/teachers-list/${maxPage}`)
    }
    const profesoresInicializados = profesoresContext.map(profesor => ({
      nombre: profesor.nombre,
      id: profesor.id,
      regimenes: 0
    }))
    const paginados = paginate(profesoresInicializados, pageSize)
    const currentPage = Math.max(1, Math.min(paginados.length, parseInt(page, 10)))
    setProfesores(paginados[currentPage - 1])
  }, [profesoresContext, page])

  const handleCheckboxChange = (idProfesor, idRegimen) => {
    setProfesores((prevState) => {
      const profesor = prevState.find(profesor => profesor.id === idProfesor)
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
      await uploadRegimen(profesoresSeleccionados)
      navigate('/user/models')
    } catch (error) {
      setModalInfo({
        text: 'Tienes que añadir todos los modulos a los profesores antes de exportar el archivo',
        icon: ICONS.ERROR
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    navigate(`/admin/teachers-list/${newPage}`)
  }

  return (
    <Layout>
      <main className='flex flex-col items-center mt-20 gap-y-4 h-[800px]'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Selección de Régimen</h1>

        <section className='w-9/12 font-postit bg-white border-4 border-black rounded-lg h-screen overflow-hidden mt-10 animate-slide-up-fade'>
          <header className='w-full flex justify-center mt-1'>
            <div className='w-6 h-6 bg-red-600 rounded-full absolute flex items-center justify-center'>
              <div className='w-4 h-4 bg-red-500 rounded-full border border-black' />
            </div>
          </header>
          <main className='w-full h-full'>
            <section className='grid grid-cols-3 gap-5  pt-10 px-10'>
              <section className='justify-self-start'>NOMBRE</section>
              <section className='justify-self-center'>ORDINARIO</section>
              <section className='justify-self-end'>ADULTOS</section>
              <ProfesorList profesores={profesores} onCheckboxChange={handleCheckboxChange} />
            </section>
            <footer className='col-span-3 flex items-center justify-between px-5 max-h-[65px] w-full absolute bottom-5'>
              <div className='flex items-center justify-center gap-3'>
                <button onClick={() => handlePageChange(parseInt(page) - 1)} disabled={parseInt(page) <= 1}>
                  <IconChevronLeft className='active:scale-95' />
                </button>
                {buttons.map((button) => (
                  <button
                    key={button}
                    onClick={() => handlePageChange(button)}
                    className={'w-4 h-4 rounded-full' +
                      (parseInt(page) === button ? ' bg-primary-100' : ' bg-primary-200')}
                  />
                ))}
                <button onClick={() => handlePageChange(parseInt(page) + 1)} disabled={parseInt(page) >= maxPage}>
                  <IconChevronLeft className='active:scale-95 rotate-180' />
                </button>
              </div>
              <button
                onClick={handleGuardar}
                className='flex w-[89px] h-[36px] justify-center rounded-md bg-primary-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:bg-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
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
          {allRegimen.map((regimen, index) => (
            <section
              key={regimen.id} className={'profesor-item flex items-center' +
            (allRegimen.length - 1 === index ? ' justify-self-end' : ' justify-self-center')}
            >
              <CheckBox
                id={`${profesor.id}-${regimen.id}`}
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

const paginate = (array, pageSize) => {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / pageSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // Inicia un nuevo array
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}
