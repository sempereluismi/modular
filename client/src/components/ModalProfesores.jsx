import { IconChevronLeft } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { getRandomColors } from '../helpers/utils'

export function ModalProfesores ({ profesoresInfo, showModal, onCloseModal, handleDownloadCsv }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  const handleCloseClick = () => {
    setIsAnimatingOut(true)
  }

  useEffect(() => {
    if (!showModal) return

    const handleAnimationEnd = () => {
      setIsAnimatingOut(false)
      onCloseModal()
    }

    if (isAnimatingOut) {
      const animationDuration = 300
      const timeoutId = setTimeout(handleAnimationEnd, animationDuration)

      return () => clearTimeout(timeoutId)
    }
  }, [showModal, onCloseModal, isAnimatingOut])

  const onConfirm = () => {
    handleDownloadCsv()
  }

  return (
    showModal && (
      <div className='fixed inset-0 z-50 overflow-y-auto text-text-100'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity cursor-pointer' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75' onClick={handleCloseClick} />
          </div>

          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
          <div className={'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full animate-in ' + (isAnimatingOut ? 'animate-out' : '')} role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
            <div className='bg-white p-6 flex flex-col items-center'>
              <h2 className='text-2xl font-semibold'>Profesores que no cumplen los requisitos</h2>
              <p className='mb-5 text-xl'>¿Seguro que quieres descargar?</p>
              <Accordion profesores={profesoresInfo} />
            </div>
            <div className='bg-gray-50 px-4 py-3 flex justify-between'>
              <button type='button' onClick={onConfirm} className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'>
                Confirmar
              </button>
              <button type='button' onClick={handleCloseClick} className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

const Accordion = ({ profesores }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className='w-full'>
      {profesores.map((profesor, index) => (
        <div key={profesor.nombre} className='mb-2 cursor-pointer w-full border-2 border-primary-200 rounded-lg p-4' onClick={() => handleAccordionClick(index)}>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>{profesor.nombre}</h3>
            <button type='button' className='text-lg'>
              <IconChevronLeft size={24} className={activeIndex === index ? '-rotate-90' : 'rotate-180'} />
            </button>
          </div>
          <div className={'overflow-hidden transition-all duration-200 max-h-0 ' + (activeIndex === index ? 'max-h-96' : 'max-h-0')}>
            <Errores info={profesor.info} />
          </div>
        </div>
      ))}
    </div>
  )
}

const Errores = ({ info }) => {
  const [randomColors, setRandomColors] = useState([])

  useEffect(() => {
    setRandomColors(getRandomColors(Object.values(info).length))
  }, [])

  return (
    <ul className='flex items-end justify-center gap-6 h-[110px] p-1'>
      {Object.entries(info).map(([key, value]) => (
        <button
          key={key}
          className='relative group grid place-items-center min-w-16 max-w-max h-16 text-black cursor-pointer'
          style={{
            backgroundColor: randomColors[Object.keys(info).indexOf(key)]
          }}
        >
          {key.toUpperCase()}
          <span className='absolute bottom-full left-1/2 w-max transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-sm rounded py-1 px-2 z-10'>
            {value}
          </span>
        </button>
      ))}
    </ul>
  )
}
