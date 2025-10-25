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
              <li><Link to="/tasks" className="hover:text-white">Browse Tasks</Link></li>
              <li><Link to="/signup" className="hover:text-white">Post a Task</Link></li>
              <li><Link to="/signup" className="hover:text-white">Find Talent</Link></li>
              <li><Link to="/" className="hover:text-white">How It Works</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tasks?category=Gig" className="hover:text-white">Gigs</Link></li>
              <li><Link to="/tasks?category=Internship" className="hover:text-white">Internships</Link></li>
              <li><Link to="/tasks?category=Tutoring" className="hover:text-white">Tutoring</Link></li>
              <li><Link to="/tasks?category=Project" className="hover:text-white">Projects</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:hello@skillbridge.com" className="hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 SkillBridge. All rights reserved.</p>
        </div>
      </Section>
    </footer>
  );
}
