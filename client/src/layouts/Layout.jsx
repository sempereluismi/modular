/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { Modal } from '../components/Modal'
import { SidebarNav } from '../components/SidebarNav'
import { ModalContext } from '../context/ModalContext'

export function Layout ({ children, mostrarSidebar = true }) {
  const { modalInfo } = useContext(ModalContext)

  return (
    <>
      {mostrarSidebar
        ? (
          <SidebarNav>{children}
            <Modal>
              {
                modalInfo && (
                  <>
                    <div>
                      {modalInfo.icon}
                    </div>
                    <p className='text-2xl text-center'>{modalInfo.text}</p>
                  </>
                )
              }
            </Modal>
          </SidebarNav>
          )
        : (
          <main>
            {children}
          </main>
          )}
    </>

  )
}
