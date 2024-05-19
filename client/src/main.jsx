import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ModulosProfesoresProvider } from './context/ModulosProfesoresContext'
import { ModalProvider } from './context/ModalContext'
import './index.css'
import router from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <ModulosProfesoresProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ModulosProfesoresProvider>
  </AuthProvider>
  // </React.StrictMode>
)
