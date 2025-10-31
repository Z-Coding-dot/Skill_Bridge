import { Home, LayoutDashboard, ListChecks, MessagesSquare,  } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const MobileFooter = () => {
  const location = useLocation();
  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/taskBoard", label: "Tasks Board", icon: ListChecks },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/messages", label: "Messages", icon: MessagesSquare },
  ];

  return (
    <footer className="flex sm:hidden fixed bottom-0 left-0 right-0 backdrop-blur-3xl drop-shadow-2xl shadow-xl">
      <div className="container px-2 flex justify-between items-center py-1">
        {links.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link to={to} key={to}>
              <button
                className={`flex flex-col items-center cursor-pointer transition-colors bg-transparent duration-300 ease-in-out`}>
                <Icon className={`size-6 ${isActive ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`} />
                <p className={`text-xs ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>{label}</p>
              </button>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default MobileFooter;
