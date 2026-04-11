import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, MessageSquare, CodeIcon, LogOut } from "lucide-react";
import { useAuth } from "@/context/useAuth";
const adminTabs = [
  { id: "overview",  label: "Overview",  to: "/admin",           icon: LayoutDashboard, end: true },
  { id: "users",     label: "Users",     to: "/admin/users",     icon: Users            },
  { id: "tasks",     label: "Tasks",     to: "/admin/tasks",     icon: Briefcase        },
  { id: "feedbacks", label: "Feedbacks", to: "/admin/feedbacks", icon: MessageSquare    },
];

export const AdminLayout = () => {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-row h-screen bg-[var(--bg)] ">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-52" : "w-16"} bg-card-bg  h-screen transition-all duration-300 flex flex-col`}>
        <div className="flex items-center gap-2 px-4 py-4 border-b border-secondary">
          <CodeIcon className="text-[#199d96] size-5 shrink-0" />
          {sidebarOpen && <span className="text-[#199d96] text-sm font-bold">Admin Panel</span>}
        </div>

        <nav className="flex flex-col flex-1 py-4 gap-1">
          {adminTabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `mx-2 flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-active text-white" : "hover:bg-btnHover text-stone-300"
                }`
              }
            >
              <tab.icon className="size-4 shrink-0 text-white" />
              {sidebarOpen && <span className="text-white">{tab.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-secondary p-3">
          {sidebarOpen && (
            <p className="text-xs text-trinary mb-2 truncate">{user?.email}</p>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs text-stone-300 hover:text-white w-full"
          >
            <LogOut className="size-4 shrink-0" />
            {sidebarOpen && <span className="text-white">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-secondary bg-card-bg">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="bg-transparent hover:bg-btnHover p-1 rounded"
          >
            <LayoutDashboard className="size-4" />
          </button>
          <h1 className="text-sm font-semibold text-white">SkillBridge Admin</h1>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};