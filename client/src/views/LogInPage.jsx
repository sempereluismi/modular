import { IconPuzzle } from '@tabler/icons-react'
import { LoginForm } from '../components/LoginForm'

export function LogInPage () {
  return (
    <>
      <IconPuzzle width={1000} height={1000} color='#ff660085' strokeWidth={1} className='fixed -z-10 -top-72 -left-72 rotate-45' />
      <LoginForm className='z-10' />
      <IconPuzzle width={1200} height={1200} color='#ff660085' strokeWidth={1} className='fixed -z-10 top-48 -right-[500px] rotate-45' />
    </>
  )
}
