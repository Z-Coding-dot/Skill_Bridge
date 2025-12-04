import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/header/SkillBridge.svg";
import MobileFooter from "../Footer/MobileFooter";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, LogOut, MessageCircle, User } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const {user, logout} = useAuth();
  const [isProfile, setIsProfile] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/taskBoard", label: "Task Board" },

  ];

  return (
    <section className="fixed w-full z-50">
      <header className="z-20 relative flex items-center justify-between px-3 1xl:px-14 2xl:px-24 backdrop-blur-3xl drop-shadow-lg">
        <Link to="/">
          <img src={logo} alt="SkillBridge Logo" className="w-32 1xl:w-35 2xl:w-45" />
        </Link>


        {/* Desktop Navbar */}
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-6">
            {links.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`transition-colors duration-700 ease-in-out text-sm 2xl:text-base ${
                      isActive
                        ? "underline underline-offset-18 text-active "
                        : "text-[var(--text-primary)]"
                    }`}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
      <div>
        {/* Auth Buttons */}
          {user  === null ? (
        <div className="flex items-center gap-4">

          <Link to={'/login'}>
          <button className="hidden sm:block bg-[var(--card-bg)] text-xs 1xl:text-sm 2xl:text-base text-[var(--text-primary)] px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors duration-500 ease-in-out">
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
                   <div onClick={() => setIsProfile(!isProfile)}className="">
                  <p className="relative border-2 rounded-full p-1.2 cursor-pointer"><User className="size-5 sm:size-6"/></p>
                  <div className={`${isProfile ? 'absolute right-2 sm:right-12 2xl:right-22 mt-2 sm:mt-5 bg-primary rounded-b-2xl py-2 sm:py-5 ' : 'pointer-events-none hidden'} `}>
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
