import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className='sm:min-h-screen min-h-dvw'>
         <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
