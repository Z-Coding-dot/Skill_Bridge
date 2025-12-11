import { Bell, CircleCheck } from 'lucide-react'
import Section from '@/components/Section/Section'

export const Notifications = () => {
  return (
    <Section>
        <div className='flex flex-col gap-4 bg-2card w-full rounded-xl p-6 mt-5'>
            <div className="flex gap-4 bg-card-bg rounded-xl p-4">
              <Bell className='mt-1 text-blue-500'/>
              <div className='flex flex-col items-start '>
                <h1>New application received</h1>
                <p>Someone applied to your task "Web Design Project"</p>
                <span className='text-xs'>2 hours ago</span>
              </div>
            </div>

            <div className="flex gap-4 bg-card-bg rounded-xl p-4">
              <CircleCheck className='mt-1 text-green-500'/>
              <div className='flex flex-col items-start '>
                <h1>Application accepted</h1>
                <p>Your application for "Marketing Intern" was accepted</p>
                <span className='text-xs'>1 day ago</span>
              </div>
            </div>
        </div>
    </Section>
  )
}

