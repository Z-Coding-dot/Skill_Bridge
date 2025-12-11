import { PanelRight, User } from "lucide-react"
import { Link } from "react-router-dom";

type sidebarProps = {
  handleSideBar: () => void;
}

export const DashboardHeader = ({handleSideBar}: sidebarProps ) => {

  return (
        <div className='flex items-center justify-between gap-3 pr-10 h-18 -mt-3 border-b border-secondary z-20'>
            <div className="flex">
              <span onClick={handleSideBar} className="hover:bg-btnHover rounded-lg p-2 cursor-pointer">
              <PanelRight  className='2xl:size-5 text-trinary'/>
              </span>
              <div className="mx-2">
                <h2 className='text-sm'>Dashboard</h2>
                 <p className='text-xs'>Manage your tasks and applications</p>
              </div>
            </div>

            <div className="rounded-full p-2 border-2">
              <Link to={'/profile'}>
              <User className="size-5 text-white"/>
              </Link>
            </div>
    </div>
  )
}

