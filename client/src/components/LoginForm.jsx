import { IconPuzzle2 } from '@tabler/icons-react'

export function LoginForm () {
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Obtener los valores de los inputs
    const usuario = event.target.user.value
    const contraseña = event.target.password.value

    // Crear el objeto con los datos para enviar en el cuerpo de la solicitud
    const datos = {
      email: usuario,
      password: contraseña
    }

    const response = await fetch('http://localhost:8000/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
    } else {
      console.error('Error en la petición:', response.statusText)
    }
  }

  return (
    <div className='flex min-h-full flex-col px-6 py-12 lg:px-8' onSubmit={handleSubmit}>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center gap-y-4'>
        <IconPuzzle2 width={50} height={50} />
        <h2 className='text-center text-4xl font-bold leading-9 tracking-tight text-gray-900'>MODULAR</h2>
      </div>
      <div className='container-login'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' action='procesar_login.php' method='POST'>
            <div>
              <label htmlFor='user' className='block text-sm font-medium leading-6 text-gray-900'>Usuario</label>
              <div className='mt-2'>
                <input id='user' name='user' type='text' required className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-200 focus:outline-none sm:text-sm sm:leading-6' />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>Contraseña</label>
                <div className='text-sm'>
                  <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>Forgot password?</a>
                </div>
              </div>
              <div className='mt-2'>
                <input id='password' name='password' type='password' required className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-200 focus:outline-none sm:text-sm sm:leading-6' />
              </div>
            </div>

            <div>
              <button type='submit' className='flex w-full justify-center rounded-md bg-primary-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:bg-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
