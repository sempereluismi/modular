import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ModulosProfesoresProvider } from './context/ModulosProfesoresContext'
import './index.css'
import router from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <ModulosProfesoresProvider>
      <RouterProvider router={router} />
    </ModulosProfesoresProvider>
  </AuthProvider>
  // </React.StrictMode>
)
