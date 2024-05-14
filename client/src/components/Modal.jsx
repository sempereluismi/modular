/* eslint-disable react/prop-types */
import { IconAlertOctagon } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

export function Modal ({ isOpen, onClose, children }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleAnimationEnd = () => {
      setIsAnimatingOut(false)
      onClose()
    }

    if (isAnimatingOut) {
      const animationDuration = 300
      const timeoutId = setTimeout(handleAnimationEnd, animationDuration)

      return () => clearTimeout(timeoutId)
    }
  }, [isOpen, onClose, isAnimatingOut])

  const handleClick = () => {
    setIsAnimatingOut(true)
  }

  return (
    isOpen && (
      <div className='fixed inset-0 z-50 overflow-y-auto text-text-100'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity cursor-pointer' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75' onClick={handleClick} />
          </div>

          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
          <div className={'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-in ' + (isAnimatingOut ? 'animate-out' : '')} role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
            <div className='bg-white p-6 flex flex-col items-center gap-y-8'>
              <div>
                <IconAlertOctagon height={100} width={100} color='#dc2626' />
              </div>
              <div>{children}</div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button type='button' onClick={handleClick} className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
