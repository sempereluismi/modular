/* eslint-disable react/prop-types */

import { SidebarNav } from '../components/SidebarNav'

export function Layout ({ children, mostrarSidebar = true }) {
  return (
    <>
      {mostrarSidebar ? <SidebarNav>{children}</SidebarNav> : <main>{children}</main>}
    </>

  )
}
