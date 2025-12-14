import { MessageCircle, PanelRight, User } from "lucide-react"
import { Link } from "react-router-dom";

type sidebarProps = {
  handleSideBar: () => void;
}

export const DashboardHeader = ({handleSideBar}: sidebarProps ) => {

  return (
        <div className='flex items-center justify-between gap-3 pr-10 h-18 -mt-3 border-b border-secondary z-20'>
            <div className="flex">
              <span onClick={handleSideBar} className="hover:bg-btnHover rounded-lg p-2 cursor-pointer mx-2">
              <PanelRight  className='2xl:size-5 text-trinary'/>
              </span>
              <div className="mx-2">
                <h2 className='text-sm'>Dashboard</h2>
                 <p className='text-xs'>Manage your tasks and applications</p>
              </div>
            </div>
            <div className="flex items-center">
              <Link to={'/messages'} className="hover:bg-btnHover hover:text-white rounded-lg p-2 cursor-pointer">
               <MessageCircle className="size-6"/>
              </Link>
            <Link to={'/profile'} className="hover:bg-btnHover hover:text-white rounded-lg p-2 cursor-pointer">
            <div className="rounded-full p-1 border-2">
              <User className="size-4 text-white"/>
            </div>
            </Link>
            </div>

    </div>
  )
}

