import { Bell, Briefcase, ChartColumn, CodeIcon, File,Settings,type LucideIcon,} from "lucide-react";
import { DashboardHeader } from "../../layouts/Dashboard/DashboardHeader";
import { useState, type JSX } from "react";
import { Overview } from "../../components/ui/Dashboard/Overview";
import { MyTask } from "../../components/ui/Dashboard/MyTask";
import { Applications } from "../../components/ui/Dashboard/Applications";
import { Notifications } from "../../components/ui/Dashboard/Notifications";
import { Setting } from "../../components/ui/Dashboard/Settings";
import { Link } from "react-router-dom";


type DashboardData = {
  label: string;
  id: string;
  icon: LucideIcon;
};

const componentMap: Record<string,JSX.Element> = {
  overview: <Overview/>,
  task: <MyTask/>,
  application: <Applications/>,
  notification: <Notifications/>,
  setting: <Setting/>
}

export const Dashboard = () => {
    const [sideBarOpen, setSideBarOpen] = useState(true)
   const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen)
  }

  const [activeTab, setActiveTab] = useState("overview")
  const sidebarTab: DashboardData[] = [
    { id: "overview", label: "Overview", icon: ChartColumn},
    { id: "task", label: "My Task", icon: Briefcase },
    { id: "application", label: "Applications", icon: File },
    { id: "notification", label: "Notifications", icon: Bell},
    { id: "setting", label: "Settings", icon: Settings },
  ];
  return (
    <div className="flex flex-wrap w-full bg-bg ">
      <div className={`${sideBarOpen ? 'w-40 bg-card-bg h-screen pt-3' : 'w-16'} transition-all duration-500 ease-initial `}>

          <Link to={'/'} className="flex items-center  gap-2 font-bold ml-4 mt-4 mb-12 ">
            <CodeIcon className={`text-[#199d96] 2xl:size-7 ${sideBarOpen ? '' : '2xl:size-7 mt-2'}`} />
            <span className={`text-[#199d96] 2xl:text-lg ${sideBarOpen ? '' : 'hidden'}`}>
                SkillBridge
            </span>
          </Link> 

        {sidebarTab.map((d) => (
          <li key={d.id}
           onClick={() => setActiveTab(d.id)} 
           className={`my-4 mx-2 truncate list-none cursor-pointer ${activeTab === d.id ? 'rounded-lg bg-active py-2 px-4' : 'py-2 px-4'}`}>
            <div className="flex items-center gap-4">
              <span>
                <d.icon className="3xl:size-5 2xl:size-4 text-white" />
              </span>
              <p className="text-white text-sm">{d.label}</p>
            </div>
          </li>
        ))}
      </div>
      <div className="w-[87%] pt-3">
        <DashboardHeader handleSideBar={handleSideBar} />
        <div>
          {componentMap[activeTab]}
        </div>
      </div>
    </div>
  );
};
