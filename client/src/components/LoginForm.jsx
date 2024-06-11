import { IconPuzzle2 } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LoadComponent } from './LoadComponent'

export function LoginForm () {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Obtener los valores de los inputs
    const usuario = event.target.user.value
    const contraseña = event.target.password.value

    const res = await login(usuario, contraseña)
    if (res) {
      navigate('/user/models')
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
              <button type='submit' className='flex w-full justify-center rounded-md bg-primary-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:bg-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                {loading
                  ? (
                    <div role='status'>
                      <LoadComponent />
                    </div>
                    )
                  : (
                      'Sing up'
                    )}
              </button>
              {
                error && <p className='text-red-500 text-center'>{error}</p>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
