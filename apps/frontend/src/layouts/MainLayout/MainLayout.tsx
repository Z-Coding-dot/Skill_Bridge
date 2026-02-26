import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop'

const MainLayout = () => {
  return (
    <>
    <ScrollToTop/>
      <Header />
      <main className='sm:min-h-screen min-h-dvw'>
         <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
