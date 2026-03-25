import { Bell, Briefcase, ChartColumn, CodeIcon, File, Settings } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import type { dashboardData } from "@/types/dashboard";
import { useRef, useState, useEffect } from "react";
import { DashboardHeader } from "@/layouts/Dashboard/DashboardHeader";
import { ROUTES } from "@/routes/routeConfig";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import MobileFooter from "@/layouts/Footer/MobileFooter";

const isMobile = () => window.innerWidth < 640;

export const Dashboard = () => {
  const [mobile, setMobile] = useState<boolean>(isMobile());
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(!isMobile());
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const onMobile = isMobile();
      setMobile(onMobile);
      if (!onMobile) setSideBarOpen(true);
      else setSideBarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useOutsideClick(sidebarRef, () => {
    if (mobile) setSideBarOpen(false);
  }, sideBarOpen);

  const sidebarTab: dashboardData[] = [
    { id: "overview",     label: "Overview",       to: "",                    icon: ChartColumn },
    { id: "task",         label: "My Task",         to: ROUTES.MY_TASK,        icon: Briefcase   },
    { id: "application",  label: "Applications",    to: ROUTES.APPLICATIONS,   icon: File        },
    { id: "notification", label: "Notifications",   to: ROUTES.NOTIFICATIONS,  icon: Bell        },
    { id: "setting",      label: "Settings",        to: ROUTES.SETTINGS,       icon: Settings    },
  ];

  return (
    <div className="flex flex-row max-sm:mb-16">

      {/* Mobile backdrop */}
      {mobile && sideBarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/40 sm:hidden"
          onClick={() => setSideBarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          ${sideBarOpen ? "w-50 1xl:w-55 sm:-mt-0.15" : "w-12 sm:w-16"}
          max-sm:fixed z-20 bg-card-bg h-screen transition-all duration-500 ease-initial
        `}
      >
        <NavLink
          to={"/"}
          className="flex items-center gap-2 font-bold pl-3 sm:pl-4 py-2.25 mb-5 sm:py-3.25 border-b border-secondary"
        >
          <CodeIcon
            className={`text-[#199d96] ${sideBarOpen ? "size-5 my-1.5" : "sm:size-7 mt-2 sm:mt-[3.5px]"}`}
          />
          <span
            className={`text-[#199d96] text-xs sm:text-sm ${sideBarOpen ? "my-1.5" : "hidden"}`}
          >
            SkillBridge
          </span>
        </NavLink>

        {sidebarTab.map((d) => (
          <NavLink
            key={d.id}
            to={d.to}
            end={d.to === ""}
            className={({ isActive }) =>
              `my-4 mx-2 block p-2 sm:px-4 py-2 ${
                isActive
                  ? "rounded-lg bg-active"
                  : "hover:bg-btnHover hover:rounded-xl"
              }`
            }
          >
            <div className="flex items-center gap-4">
              <d.icon className="text-white size-4" />
              {sideBarOpen && (
                <span className="text-white text-xs sm:text-sm">{d.label}</span>
              )}
            </div>
          </NavLink>
        ))}
      </div>

      {/* Main content */}
      <main className="ml-10 sm:ml-0 w-full pt-3">
        <DashboardHeader handleSideBar={() => setSideBarOpen((prev) => !prev)} />
        <div>
          <Outlet />
        </div>
      </main>

        <div className="sm:hidden z-50 ">
        <MobileFooter/>
        </div>
    </div>
  );
};