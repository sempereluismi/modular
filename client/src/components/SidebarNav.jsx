/* eslint-disable react/prop-types */
import { IconChevronLeft, IconUser, IconMenu, IconSearch, IconFolder, IconCalendar, IconSettings, IconPuzzle2 } from '@tabler/icons-react'

import { useState } from 'react'

export function SidebarNav ({ children }) {
  const [open, setOpen] = useState(false)
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
      <div className='flex text-primary'>
        <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 relative bg-white`}>
          <IconChevronLeft
            className={`absolute cursor-pointer rounded-full -right-4 top-[38px] w-7 h-7 border 2 border-dark-purple bg-white ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />
          <div className='flex gap-x-4 items-center select-none'>
            <div onClick={() => setOpen(!open)}>
              <IconPuzzle2 width={40} height={40} color='#FF6600' className={`cursor-pointer duration-500 active:scale-75 ${open && 'rotate-[360deg]'}`} />
            </div>
            <h1 className={`text-text-100 origin-left font-bold text-2xl duration-300 ${!open && 'scale-0'}`}>MODULAR</h1>
          </div>
          <ul className='pt-6 select-none'>
            {Menus.map((menu, index) => (
              <li key={index} className={`text-text-100 h-9 p-2 text-sm flex items-center gap-x-4 cursor-pointer hover:bg-primary-100 active:bg-primary-200 hover:text-white rounded-md  ${menu.gap ? 'mt-9' : 'mt-2'}`}>
                <div className=''>{menu.icon}</div>
                <span className={`${!open && 'scale-0'} transition duration-200 origin-left text-lg`}>{menu.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-screen w-[2px] bg-accent-200' />
        <div className='flex-1 h-screen overflow-hidden' onClick={() => setOpen(false)}>
          {children}
        </div>
      </div>
    </>
  )
}
