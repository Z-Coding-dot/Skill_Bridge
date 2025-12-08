import { PanelRight } from "lucide-react"

type sidebarProps = {
  handleSideBar: () => void;
}

export const DashboardHeader = ({handleSideBar}: sidebarProps ) => {

  return (
        <div className='flex items-center gap-3 w-full px-3 h-18 -mt-3 border-b border-secondary z-20'>
              <span onClick={handleSideBar} className="hover:bg-hover rounded-lg p-2 cursor-pointer">
              <PanelRight  className='2xl:size-5 text-trinary'/>
              </span>
              <div>
                <h2 className='text-sm'>Dashboard</h2>
                 <p className='text-xs'>Manage your tasks and applications</p>
           </div>
    </div>
  )
}

