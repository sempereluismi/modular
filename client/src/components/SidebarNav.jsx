import { IconChevronLeft, IconUser, IconMenu, IconSearch, IconFolder, IconCalendar, IconSettings } from '@tabler/icons-react'

import { useState } from 'react'

export function SidebarNav () {
  const [open, setOpen] = useState(true)
  const Menus = [
    { title: 'Menú', src: <IconMenu /> },
    { title: 'Profesores', src: <IconUser />, gap: true },
    { title: 'Buscar', src: <IconSearch /> },
    { title: 'Horarios', src: <IconFolder />, gap: true },
    { title: 'Calendario', src: <IconCalendar /> },
    { title: 'Ajustes', src: <IconSettings /> }
  ]
  return (
    <>
      <div className='flex'>
        <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}><IconChevronLeft
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 h-7 border 2 border-dark-purple bg-white ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}/>

          <div className='flex gap-x-4 items-center'>
            <img src='../assets/logo.png' className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`} />
            <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>Modular</h1>
          </div>
          <ul className='pt-6'>
            {Menus.map((menu, index) => (
              <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.gap ? 'mt-9' : 'mt-2'}`}>
                {menu.src}
                <span className={`${!open && 'hidden'} origin-left duration-200 `}>{menu.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
          <h1>Hola Luimi</h1>
        </div>
      </div>
    </>
  )
}
