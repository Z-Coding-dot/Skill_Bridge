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
    <footer className="flex items-center justify-center left-4.5 sm:hidden fixed bottom-1 rounded-full mx-auto backdrop-blur-3xl drop-shadow-3xl bg-2card/100 shadow-xl">
      <div className="container px-1 flex justify-between items-center py-1">
        {links.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link to={to} key={to}>
              <button
                className={`${isActive ? "bg-active/20 rounded-full" : "bg-transparent"} flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out`}>
                <Icon className={`size-4 ${isActive ? "text-text-primary" : "text-white"}`} />
                <p className={`text-[10px] font-inter ${isActive ? 'text-text-primary' : 'text-white'}`}>{label}</p>
              </button>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default MobileFooter;
