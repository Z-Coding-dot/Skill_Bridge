import { Link } from 'react-router-dom';
import  logo  from '../../assets/header/SkillBridge.svg';
import Section from '../../components/Section/Section';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-black mt-15 max-sm:pb-15">
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-white mb-4">
            <img src={logo} alt="SkillBridge Logo" className='w-35 md:w-45' />
            </Link>
            <p className="text-sm">
              Connecting students with opportunities to learn, grow, and earn.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/taskBoard" className="hover:text-white">Browse Tasks</Link></li>
              <li><Link to="/dashboard" className="hover:text-white">Post a Task</Link></li>
              <li><Link to="/taskBoard" className="hover:text-white">Find Talent</Link></li>
              <li><a href="#how_works" className="hover:text-white">How It Works</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href='#categories' className="hover:text-white">Gigs</a></li>
              <li><a href='#categories' className="hover:text-white">Internships</a></li>
              <li><a href='#categories' className="hover:text-white">Tutoring</a></li>
              <li><a href='#categories' className="hover:text-white">Projects</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://t.me/parsa344" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/ziaulhaq-parsa-karimi-8a6149373" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/Z-Coding-dot" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:parsakarimi776@gmail.com" target='_blank' rel="noopener noreferrer" className="hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
        </div>
      </Section>
    </footer>
  );
}
