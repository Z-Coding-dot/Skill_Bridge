import Section from "@/components/Section/Section"
import {Bell, Briefcase, CheckCheckIcon, CircleCheck, File, type LucideIcon } from "lucide-react"

type OverviewProps = {
    id: string,
    count: number,
    label: string,
    icon: LucideIcon
}
type activity = {
    id: string,
    time: string,
    icon: LucideIcon,
    text: string,
}


export const Overview = () => {
    const overview:OverviewProps[] = [
        {id: "1", label: "Tasks Posted", count: 10, icon: Briefcase},
        {id: "2", label: "Applications Sent", count: 2, icon: File},
        {id: "3", label: "Accepted", count: 0, icon: CheckCheckIcon},
    ]

    const recentActivity:activity[] = [

        {id: "4", icon: Bell ,text: "New application received for Web Design Project", time: "2 hours ago" },
        {id: "5", icon: CircleCheck ,text: "Your application was accepted for Marketing Intern", time: "1 day ago" },
    ]

    return(
        <Section>
            <div className="grid grid-cols-3 gap-6 mt-5">
                {overview.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between bg-2card shadow-sm px-6 py-4 rounded-2xl">
                            <div>
                                <h2 className="text-trinary">{item.label}</h2>
                                <p className="text-2xl text-white font-semibold">{item.count}</p>
                            </div>
                            <div>
                                <span className="text-white "><item.icon className="size-8" /></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

                <div className="gird grid-rows-1 rounded-2xl p-5 mt-10">
                    <h2 className="text-xl mb-4">Recent Activity</h2>
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center px-6 py-4 gap-4">
                            <div className="flex items-center bg-2card shadow-lg rounded-2xl w-full px-6 py-4 gap-4">
                            <activity.icon/>
                            <div className="">   
                                <h3 className="text-sm">{activity.text}</h3>
                                <span>{activity.time}</span>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
        </Section>
    )
}