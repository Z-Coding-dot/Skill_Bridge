import { Bell, Briefcase, ChartColumn, CodeIcon, File,Settings} from "lucide-react";
import {NavLink, Outlet } from "react-router-dom";
import type { dashboardData } from "@/types/dashboard";
import { useState, } from "react";
import { DashboardHeader } from "@/layouts/Dashboard/DashboardHeader";
import { ROUTES } from "@/routes/routeConfig";


export const Dashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)

  const sidebarTab: dashboardData[] = [
    { id: "overview", label: "Overview", to: "", icon: ChartColumn },
    { id: "task", label: "My Task", to: ROUTES.MY_TASK, icon: Briefcase },
    { id: "application", label: "Applications", to: ROUTES.APPLICATIONS, icon: File },
    { id: "notification", label: "Notifications", to: ROUTES.NOTIFICATIONS, icon: Bell },
    { id: "setting", label: "Settings", to: ROUTES.SETTINGS, icon: Settings },
  ];
  return (
    <div className="flex flex-row w-full bg-card-bg h-screen ">
      <div className={`${sideBarOpen ? '1xl:w-55 pt-3' : 'w-16'} transition-all duration-500 ease-initial bg-bg`}>
          <NavLink to={'/'} className="flex items-center  gap-2 font-bold ml-4 mt-4 mb-12 ">
            <CodeIcon className={`text-[#199d96] 2xl:size-7 ${sideBarOpen ? '' : '2xl:size-7 mt-2'}`} />
            <span className={`text-[#199d96] 2xl:text-lg ${sideBarOpen ? '' : 'hidden'}`}>
                SkillBridge
            </span>
          </NavLink> 

        
        {sidebarTab.map((d) => (
          <NavLink
            key={d.id}
            to={d.to}
            end={d.to === ""}
            className={({ isActive }) =>
              `my-4 mx-2 block px-4 py-2 ${
                isActive
                  ? "rounded-lg bg-active"
                  : "hover:bg-btnHover hover:rounded-xl"
              }`
            }>
              <div className="flex items-center gap-4">
              <d.icon className="text-white 2xl:size-4" />
              {sideBarOpen && (
                <span className="text-white text-sm">{d.label}</span>
              )}
            </div>
          </NavLink>
        ))}
      </div>

        {/* content */}
      <main className="w-full pt-3">
        <DashboardHeader handleSideBar={() => setSideBarOpen((prev) => !prev)} />
        <div>
          <Outlet/>
        </div>
      </main>
    </div>
  );
};
