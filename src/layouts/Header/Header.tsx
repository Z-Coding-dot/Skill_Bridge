import Section from '../../components/Section/Section';
import logo from '../../assets/header/SkillBridge.png';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Section>
      <header className='flex items-center justify-between top-0 left-0 right-0'>
          <a href="#">
            <img src={logo} alt="SkillBridge logo" className='w-50 h-full' />
          </a>
          <nav className='flex items-center gap-6'>
            <Link to={'/'} >How it Works</Link>
            <Link to={'/'} >Categories</Link>
            <Link to={'/'} >FAQ</Link>
          </nav>
          <button>Sign Up</button>
      </header>
    </Section>
  )
}

