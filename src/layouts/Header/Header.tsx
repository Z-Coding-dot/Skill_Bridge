import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/header/SkillBridge.svg";
import MobileFooter from "@/layouts/Footer/MobileFooter";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, LayoutDashboard, LogOut, MessageCircle, User } from "lucide-react";
import { useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const {user, logout} = useAuth();
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const sideRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(sideRef, () => setIsProfile(false), isProfile)
  const navData = [
    { to: "/", label: "Home" },
    { to: "/taskBoard", label: "Find a Work" },
    { label: "Why SkillBridge", dropdown:[
      { title: "For Freelancers", desc: "Find real-world projects and grow faster" },
      { title: "For Clients", desc: "Hire verified talent with confidence" },
      { title: "Trust & Security", desc: "Escrow-based payments and reviews" },
    ] },
    { label: "What's New", dropdown:[
      { title: "New Features", desc: "Latest tools and improvements" },
      { title: "Product Updates", desc: "Recent releases and fixes" },
      { title: "Community", desc: "Events, blogs, and announcements" },
    ] },

  ];

  return (
    <section className="fixed w-full z-50">
      <header className="z-20 relative flex items-center justify-between px-3 1xl:px-12 backdrop-blur-3xl drop-shadow-lg">
        <Link to="/">
          <img src={logo} alt="SkillBridge Logo" className="w-32 1xl:w-35 2xl:w-45" />
        </Link>
        {/* Desktop Navbar */}
    <nav className="hidden sm:block">
      <ul className="flex items-center gap-6">
    {navData.map((link) => (
      <li key={link.label} className="relative group flex items-center justify-center gap-1">
        {link.to ? (
          <Link
            to={link.to}
            className={`${path === link.to ? "text-active underline font-bold" :  'text-white'} 1xl:text-sm 2xl:text-base  hover:underline underline-offset-18 transition`} >
            {link.label}
          </Link>
        ) : (
          <span className="cursor-pointer text-sm text-white">
            {link.label}
          </span>
        )}
        {/* Dropdown */}
        {link.dropdown && (
          <>
          <ChevronDown className="size-5 transition-transform duration-500 group-hover:rotate-180" />
          <div className="absolute 1xl:-right-30 2xl:-right-50 top-full mt-4 1xl:w-150 2xl:w-200 bg-card-bg rounded-b-xl shadow-xl
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-300">
            <ul className="2xl:p-5 1xl:p-3 grid grid-cols-3 gap-4 mr-25 text-start mx-auto w-full">
              {link.dropdown.map((item) => (
                <li
                  key={item.title}
                  className="2xl:p-6 1xl:p-3 bg-card-bg hover:bg-btnHover cursor-pointer rounded-2xl shadow-2xl" >
                  <h2 className="1xl:text-sm 2xl:text-base font-medium mb-2">{item.title}</h2>
                  <p className="1xl:text-sm 2xl:text-base opacity-70 text-trinary">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          </>
        )}
      </li>
    ))}
  </ul>
    </nav>

        
      <div>
        {/* Auth Buttons */}
          {user  === null ? (
        <div className="flex items-center gap-4">

          <Link to={'/login'}>
          <button className="hidden sm:block bg-[var(--card-bg)] text-xs 1xl:text-sm 2xl:text-base text-[var(--text-primary)] px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-lg hover:bg-text-primary transition-colors duration-500 ease-in-out">
            Log in</button>
          </Link>
          <Link to={'/signUp'}>
          <button className="px-3 py-1 2xl:px-4 2xl:py-1.5  text-xs 1xl:text-sm 2xl:text-base">Sign Up</button>
          </Link>
        </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to='/messages' className="hidden sm:block">
                <p className="cursor-pointer"><MessageCircle/></p>
                </Link>
                   <div ref={sideRef} onClick={() => setIsProfile(!isProfile)}>
                  <p className="relative border-2 rounded-full p-1.2 cursor-pointer"><User className="size-5 sm:size-6"/></p>
                  <div className={`${isProfile ? 'absolute right-2 sm:right-12 2xl:right-10 mt-2 sm:mt-5 bg-primary rounded-b-2xl py-2 sm:py-5 ' : 'pointer-events-none hidden'} `}>
                    <Link to='/dashboard' >
                    <p
                     className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-6 mb-2 hover:text-white cursor-pointer"><LayoutDashboard className="size-3 sm:size-4"/> Dashboard</p>
                    </Link>
                    <Link to='/profile' >
                    <p
                     className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-6 mb-3 hover:text-white cursor-pointer"><User className="size-3 sm:size-4"/> My Profile</p>
                    </Link>
                    <hr />
                    <p
                     onClick={logout} className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-6 mt-2 text-error hover:text-red-600 cursor-pointer group"><LogOut className="size-3 sm:size-4 text-error group-hover:text-red-600"/> Logout</p>
                  </div>
              </div>
              </div>
            )}
           </div>

      </header>

      <MobileFooter />
    </section>
  );
};
