import { useContext, useState } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { Layout } from '../layouts/Layout'

export function ListaProfesores () {
  const { profesores, allRegimen } = useContext(ModulosProfesoresContext)
  const [loading, setLoading] = useState(false)

  const handleGuardar = async () => {
    const profesoresSeleccionados = []
    const listaProfesores = document.querySelectorAll('.profesor')

    listaProfesores.forEach(profesor => {
      const id = profesor.getAttribute('id')
      const select = profesor.querySelector('select')
      const valorSeleccionado = select.value
      profesoresSeleccionados.push({ id_profesor: id, id_regimen: valorSeleccionado })
    })
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/regimen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profesoresSeleccionados)
      })

      if (response.ok) {
        setLoading(false)
      }

      if (!response.ok) {
        setLoading(false)
        throw new Error('Error al enviar la solicitud')
      }
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error)
    }
  }

  return (
    <ModulosProfesoresProvider>
      <ProfesoresContent />
    </ModulosProfesoresProvider>
  )
}

function ProfesoresContent () {
  const { setModulos, setProfesores, setAllRegimen, setRegimen, regimen, setFilteredModulos } = useContext(ModulosProfesoresContext)
  const { getModulos, getProfesores, setPositionsModulos, getRegimen } = useModulosProfesores()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getRegimen()
      .then((regimenes) => {
        setAllRegimen(regimenes)
        setRegimen(regimenes[0].tipo)
        Promise.all([getModulos(), getProfesores()])
          .then(([modulosResponse, profesoresResponse]) => {
            // Aquí puedes manejar las respuestas de ambas funciones
            setModulos(modulosResponse)
            setPositionsModulos(modulosResponse)
            setProfesores(profesoresResponse)
            const filtered = modulosResponse.filter(modulo => modulo.regimen === regimen)
            setFilteredModulos(filtered)
            setLoading(false)
          })
          .catch(error => {
            // Maneja cualquier error que pueda ocurrir en alguna de las peticiones
            console.error('Error al obtener módulos o profesores:', error)
          })
      })
      .catch(error => {
        console.error('Error al obtener el régimen:', error)
      })
  }, [])

  return (
    <Layout>
<<<<<<< HEAD
      <>
        {loading ? <Loader /> : <BoardEntero />}
      </>
=======
      <main className='flex flex-col items-center mt-20 gap-y-4 h-screen'>
        <h1>Selección de Régimen</h1>
        <ul>
          {profesores.map((profesor) => {
            return (
              <li key={profesor.id} id={profesor.id} className='flex gap-x-4 profesor'>
                {profesor.nombre}

                <select className='text-text-100'>
                  {
                    allRegimen.map((regimen) => (
                      <option selected={profesor.regimen === regimen.tipo} key={regimen.id} value={regimen.id}>{regimen.tipo}</option>
                    ))
                  }
                </select>
              </li>
            )
          }
          )}
        </ul>
        <button onClick={handleGuardar}>
          {loading
            ? (
              <div role='status'>
                <svg aria-hidden='true' className='w-6 h-6 text-primary-100 animate-spin fill-white' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' /><path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' /></svg>
                <span className='sr-only'>Loading...</span>
              </div>
              )
            : (
                'Guardar'
              )}
        </button>
      </main>
>>>>>>> 40bf3dcc62d76e1afbe6bb8423ed7b3b9a22427b
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
