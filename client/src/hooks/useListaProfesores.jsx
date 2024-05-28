import { useContext, useState } from 'react'
import { useModulosProfesores } from './useModulosProfesores'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'

export function useListaProfesores () {
  const { getProfesores } = useModulosProfesores()
  const [profesoresPaginados, setProfesoresPaginados] = useState([])
  const [profesores, setProfesores] = useState([])
  const { allRegimen } = useContext(ModulosProfesoresContext)
  const pageSize = 8

  const maxPage = Math.ceil(profesores.length / pageSize)
  const buttons = Array.from({ length: maxPage }, (v, i) => i + 1)

  async function fetchProfesores (page) {
    const profesores = await getProfesores()
    const profesoresInicializados = profesores.map(profesor => ({
      nombre: profesor.nombre,
      id: profesor.id,
      regimenes: allRegimen.find(regimen => profesor.regimen === regimen.tipo)?.id || 0
    }))
    const paginados = paginate(profesoresInicializados, pageSize)
    const currentPage = Math.max(1, Math.min(paginados.length, parseInt(page, 10)))
    setProfesoresPaginados(paginados[currentPage - 1])
    setProfesores(profesoresInicializados)
  }

  function paginate (array, pageSize) {
    return array.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / pageSize)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // Inicia un nuevo array
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])
  }

  return {
    profesoresPaginados,
    setProfesoresPaginados,
    profesores,
    pageSize,
    maxPage,
    buttons,
    fetchProfesores
  }
}
