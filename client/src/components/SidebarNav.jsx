/* eslint-disable react/prop-types */
import { IconChevronLeft, IconUser, IconMenu, IconSearch, IconFolder, IconCalendar, IconSettings, IconPuzzle2 } from '@tabler/icons-react'

import { useState } from 'react'

export function SidebarNav ({ children }) {
  const [open, setOpen] = useState(true)
  const Menus = [
    { title: 'Menú', icon: <IconMenu /> },
    { title: 'Profesores', icon: <IconUser />, gap: true },
    { title: 'Buscar', icon: <IconSearch /> },
    { title: 'Horarios', icon: <IconFolder />, gap: true },
    { title: 'Calendario', icon: <IconCalendar /> },
    { title: 'Ajustes', icon: <IconSettings /> }
  ]
  return (
    <>
      <div className='flex'>
        <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}>
          <IconChevronLeft
            className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 h-7 border 2 border-dark-purple bg-white ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />
          <div className='flex gap-x-4 items-center'>
            <div>
              <IconPuzzle2 width={40} height={40} color='#fff' className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`} />
            </div>
            <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>Modular</h1>
          </div>
          <ul className='pt-6'>
            {Menus.map((menu, index) => (
              <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md transition-all ${menu.gap ? 'mt-9' : 'mt-2'}`}>
                <div>{menu.icon}</div>
                <span className={`${!open && 'hidden'} origin-left duration-200 `}>{menu.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1 h-screen'>
          {children}
        </div>
      </div>
    </>
  )
}
