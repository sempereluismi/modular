import { useContext, useEffect, useState } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'
import { getRandomColors, randomInt } from '../helpers/utils'

export function SelectRegimen () {
  const { allRegimen, regimen, setRegimen } = useContext(ModulosProfesoresContext)
  const [regimenCompleto, setRegimenCompleto] = useState({})
  const [randomColors, setRandomColors] = useState([])
  useEffect(() => {
    setRandomColors(getRandomColors(allRegimen.length))
  }, [])

  useEffect(() => {
    const newRegimenCompleto = allRegimen.find((regimenItem) => regimenItem.tipo === regimen)
    setRegimenCompleto(newRegimenCompleto)
  }, [regimen])

  return (
    <div
      className='group h-10 max-w-max px-2 grid place-items-center text-black font-postit rotate-1 cursor-pointer hover:scale-105 transition-all duration-200' style={{
        backgroundColor: randomColors[regimenCompleto.id - 1]
      }}
    >
      <div>{regimen}</div>
      <div className='hover:cursor-auto p-5 absolute top-full transform left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col gap-3 z-10'>
        {
          allRegimen.map((regimenItem) => {
            if (regimenItem.tipo !== regimen) {
              return (
                <div
                  key={regimenItem.id}
                  onClick={() => setRegimen(regimenItem.tipo)}
                  className='h-10 w-24 max-w-max px-2 grid place-items-center text-black font-postit cursor-pointer'
                  style={{
                    backgroundColor: randomColors[regimenItem.id - 1],
                    transform: `rotate(${randomInt(-3, 3)}deg)`
                  }}
                >
                  {regimenItem.tipo}
                </div>
              )
            }
            return null
          })
        }
      </div>
    </div>
  )
}
