import { useContext, useState } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { Layout } from '../layouts/Layout'

export function ListaProfesores () {
  return (
    <Layout>
      <div className='container-listaProfesores'>
        <div className='container-Profesor'>
          <p>Patricia</p>
        </div>
      </div>
    </Layout>
  )
}
const BoardEntero = () => {
  return (
    <main className='bg-white grid grid-cols-[300px_1fr] h-screen text-white'>
      <Profesores />
      <Board />
    </main>
  )
}
