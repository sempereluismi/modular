import { IconSearch, IconTemplate, IconLogout2, IconBook, IconLayout, IconSchool } from '@tabler/icons-react'

export const menuProf = [
  { title: 'Plantilla', icon: IconTemplate, url: '/user/plantilla' },
  { title: 'Horarios', icon: IconLayout, gap: true, url: '/user/quenda' },
  { title: 'Logout', icon: IconLogout2, gap: true, url: '/logout' }
]

export const menuAdmin = [
  { title: 'Insertar Profesores', icon: IconSchool, gap: true, url: '/admin/insertar/profesores' },
  { title: 'Insertar Modulos', icon: IconBook, url: '/admin/insertar/modulos' },
  { title: 'Plantilla', icon: IconTemplate, url: '/user/plantilla' },
  { title: 'Lista Profes', icon: IconSearch, gap: true, url: '/admin/lista-profesores' },
  { title: 'Horarios', icon: IconLayout, gap: true, url: '/user/quenda' },
  { title: 'Logout', icon: IconLogout2, gap: true, url: '/logout' }
]
