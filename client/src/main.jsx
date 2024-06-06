import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ModalProvider } from './context/ModalContext'
import { ModelsProvider } from './context/ModelsContext'
import { ModulosProfesoresProvider } from './context/ModulosProfesoresContext'
import './index.css'
import router from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <ModulosProfesoresProvider>
      <ModelsProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ModelsProvider>
    </ModulosProfesoresProvider>
  </AuthProvider>
  // </React.StrictMode>
)
