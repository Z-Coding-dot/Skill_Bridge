import { Link } from 'react-router-dom';
import  logo  from '../../assets/header/SkillBridge.svg';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import * as m from 'motion/react-client'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () =>{
    setMenuOpen(!menuOpen);
  }
  return (
    <section className='fixed w-full z-50'>
      <header className='z-20 relative flex items-center justify-between px-4 md:px-22 backdrop-blur-3xl drop-shadow-lg bg-'>
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

          <div className={`${menuOpen ? 'translate-x-0  bg-[var(--bg)]': 'translate-x-full'}
           absolute inset-0 min-h-screen sm:hidden z-50 transition-transform duration-300`}>
          <nav className='flex flex-col items-start'>
          <ul className='mt-20 mx-16'>
              <m.li 
              initial={{ opacity: 0, y: -110 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.2}}
              
               className='my-4 font-semibold text-2xl'><Link to={'/'} >How it Works</Link></m.li>
              <m.li 
              initial={{ opacity: 0, y: -150 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9}}
               className='my-4 font-semibold text-2xl'><Link to={'/'} >Categories</Link></m.li>
              <m.li 
              initial={{ opacity: 0, y: -190 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.7}}
               className='my-4 font-semibold text-2xl'><Link to={'/'} >FAQ</Link></m.li>
            </ul>
          </nav>
          </div>

          <div className='flex items-center gap-4'>
          <button>Sign in</button>
          {menuOpen ? (
            <X onClick={handleMenu} className={'block sm:hidden size-7 cursor-pointer z-50'} />
          ): (
          <Menu onClick={handleMenu} className='block sm:hidden cursor-pointer size-5'/>
          )}
          </div>
      </header>
    </section>
  )
}

