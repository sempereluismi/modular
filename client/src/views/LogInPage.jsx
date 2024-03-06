import { IconPuzzle } from '@tabler/icons-react'
import { LoginForm } from '../components/LoginForm'
import { Layout } from '../layouts/Layout'

export function LogInPage () {
  return (
    <Layout mostrarSidebar={false}>
      <IconPuzzle width={1200} height={1200} color='#ff660095' strokeWidth={1} className='fixed -z-10 -top-72 -left-[500px] rotate-45' />
      <LoginForm className='z-10' />
      <IconPuzzle width={1200} height={1200} color='#ff660095' strokeWidth={1} className='fixed -z-10 top-48 -right-[500px] rotate-45' />
    </Layout>
  )
}
