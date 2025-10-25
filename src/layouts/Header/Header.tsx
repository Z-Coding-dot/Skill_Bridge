import { Link } from 'react-router-dom';
import  logo  from '../../assets/header/SkillBridge.svg';
import MobileFooter from '../MobileFooter/MobileFooter';

export const Header = () => {
  return (
    <section className='fixed w-full z-50 '>
      <header className='z-20 relative flex items-center justify-between px-3 md:px-22 backdrop-blur-3xl drop-shadow-lg bg-'>
          <a href="#">
            <img src={logo} alt="SkillBridge Logo" className='w-35 md:w-45' />
          </a>
          {/* Desktop Navbar */}
          <nav className='hidden sm:block'>
          <ul className='flex items-center gap-6'>
              <li className='hover:underline '><Link to={'/'} >Home</Link></li>
              <li className='hover:underline '><Link to={'/'} >Task Board</Link></li>
              <li className='hover:underline '><Link to={'/'} >Dashboard</Link></li>
            </ul>
            
          </nav>
              {/* Mobile Navbar  */}
            <div className='flex items-center gap-4'>
            <button className='hidden sm:block bg-[var(--card-bg)] text-[var(--text-primary)] px-4 py-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors duration-500 ease-in-out'>Log in</button>
            <button>Sign Up</button>
            </div>
            </header>
              <MobileFooter/>
    </section>
  )
}

