import { Card } from '../components/Card'
import { DarkMode } from '../components/DarkMode'
import { Switch } from '../components/Switch'
import { Layout } from '../layouts/Layout'
import '../styles/var.css'

export function PlantillaDarkMode () {
  return (
    <Layout>
      <div className='container mx-auto text-center text-3xl font-black'>
        <DarkMode />
      </div>
      <Switch />
      <Card />
    </Layout>
  )
}
