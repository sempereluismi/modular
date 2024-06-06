import { IconSearch, IconTemplate, IconLogout2, IconBook, IconLayout, IconSchool } from '@tabler/icons-react'

export const menuProf = [
  { title: 'Plantilla', icon: IconTemplate, url: '/user/models' },
  { title: 'Horarios', icon: IconLayout, gap: true, url: '/user/model' },
  { title: 'Logout', icon: IconLogout2, gap: true, url: '/logout' }
]

export const menuAdmin = [
  { title: 'Insertar Profesores', icon: IconSchool, gap: true, url: '/admin/insert/teachers' },
  { title: 'Insertar Modulos', icon: IconBook, url: '/admin/insert/modules' },
  { title: 'Plantilla', icon: IconTemplate, url: '/user/models' },
  { title: 'Lista Profes', icon: IconSearch, gap: true, url: '/admin/teachers-list' },
  { title: 'Horarios', icon: IconLayout, gap: true, url: '/user/model' },
  { title: 'Logout', icon: IconLogout2, gap: true, url: '/logout' }
]
