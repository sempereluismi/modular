import React, { useState, useEffect } from 'react'

export const Switch = () => {
  const [theme, setTheme] = useState('light')

  const handleChange = (e) => setTheme(e.target.checked ? 'dark' : 'light')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return React.createElement(
    'div',
    { className: 'flex justify-center mx-auto mt-8' },
    React.createElement(
      'label',
      { className: 'relative inline-flex items-center cursor-pointer' },
      React.createElement('input', {
        className: 'sr-only peer',
        type: 'checkbox',
        onChange: handleChange,
        checked: theme === 'dark'
      }),
      React.createElement('div', {
        className:
          'w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-[""] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-[""] after:absolute after:bg-[#1d1d1d] after:rounded-full after:right-1 after:translate-y-10 after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-1'
      })
    )
  )
}
