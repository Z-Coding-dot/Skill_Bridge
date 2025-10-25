import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/header/SkillBridge.svg";
import MobileFooter from "../Footer/MobileFooter";

export const Header = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/taskBoard", label: "Task Board" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <section className="fixed w-full z-50">
      <header className="z-20 relative flex items-center justify-between px-3 md:px-22 backdrop-blur-3xl drop-shadow-lg">
        <Link to="/">
          <img src={logo} alt="SkillBridge Logo" className="w-35 md:w-45" />
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
                    className={`transition-colors duration-700 ease-in-out ${
                      isActive
                        ? "underline underline-offset-18 text-[var(--accent)]"
                        : "text-[var(--text-primary)]"
                    }`}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-[var(--card-bg)] text-[var(--text-primary)] px-4 py-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors duration-500 ease-in-out">
            Log in
          </button>
          <button>Sign Up</button>
        </div>
      </header>

      <MobileFooter />
    </section>
  );
};
