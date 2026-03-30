import { MessageCircle, PanelRight, User } from "lucide-react"
import { Link } from "react-router-dom";

type sidebarProps = {
  handleSideBar: () => void;
}

export const DashboardHeader = ({handleSideBar}: sidebarProps ) => {

  return (
        <div className='flex items-center justify-between gap-3 pr-2 2x1:pr-10 pb-1.5 sm:pb-0.5 border-b border-secondary z-20'>
            <div className="flex">
              <span onClick={handleSideBar} className="hover:bg-btnHover rounded-lg p-2 cursor-pointer mx-1.5 1xl:mx-2">
              <PanelRight  className='size-4 2xl:size-5 text-trinary'/>
              </span>
              <div className="1xl:mx-2">
                <h2 className='text-xs 1xl:text-sm'>Dashboard</h2>
                 <p className='text-[10px] sm:text-xs truncate'>Manage your tasks and applications</p>
              </div>
            </div>
            <div className="flex items-center">
              <Link to={'/messages'} className="hover:bg-btnHover hover:text-white rounded-lg p-1 sm:p-2 cursor-pointer">
               <MessageCircle className="size-5 2xl:size-6"/>
              </Link>
            <Link to={'/profile'} className="hover:bg-btnHover hover:text-white rounded-lg p-1 sm:p-2 cursor-pointer">
            <div className="rounded-full p-1 border-2">
              <User className="size-3 2xl:size-4 text-white"/>
            </div>
            </Link>
            </div>

    </div>
  )
}

