/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'

export const ModalContext = createContext()

export function ModalProvider ({ children }) {
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState(null)

  useEffect(() => {
    setShowModal(modalInfo !== null)
  }, [modalInfo])

  const onCloseModal = () => {
    setModalInfo(null)
  }

  const contextValue = {
    showModal,
    modalInfo,
    setModalInfo,
    onCloseModal
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}
