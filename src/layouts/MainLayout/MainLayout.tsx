import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
