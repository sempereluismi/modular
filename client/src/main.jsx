import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { SidebarNav } from './components/SidebarNav'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SidebarNav />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
