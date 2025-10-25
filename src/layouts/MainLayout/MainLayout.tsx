import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'

const MainLayout = () => {
  return (
    <div className='min-h-dvw'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
