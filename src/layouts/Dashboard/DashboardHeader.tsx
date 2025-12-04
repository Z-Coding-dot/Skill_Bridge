import { PanelRight } from "lucide-react"

type sidebarProps = {
  handleSideBar: () => void;
}

export const DashboardHeader = ({handleSideBar}: sidebarProps ) => {

  return (
        <div className='flex items-center gap-3 bg-card-bg w-full px-3 h-18 -mt-3'>
              <PanelRight onClick={handleSideBar} className='2xl:size-6 cursor-pointer'/>
              <div className=''>
                <h2 className='text-sm'>Dashboard</h2>
                 <p className='text-xs'>Manage your tasks and applications</p>
           </div>
    </div>
  )
}

