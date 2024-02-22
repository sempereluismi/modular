/* eslint-disable react/prop-types */

import { SidebarNav } from '../components/SidebarNav'

export function Layout ({ children }) {
  return (
    <SidebarNav>
      {children}
    </SidebarNav>
  )
}
