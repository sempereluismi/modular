import { useEffect, useState } from 'react'

function DarkMode () {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    if (theme === 'light') {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }
  }, [theme])
  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }
  return (
    <div className='h-screen flex justify-center items-center dark:bg-neutral-950'>
      <button
        className='bf-slate-200 px-4 py-2 rounded hover:bg-slate-300 dark:bg-neutral-50 dark:text-black dark:hover:bg-neutral-500'
        onClick={handleChangeTheme}
      >
        Change Theme
      </button>
    </div>
  )
}

export default DarkMode
