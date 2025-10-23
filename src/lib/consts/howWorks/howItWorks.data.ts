import { Briefcase, Search, User } from 'lucide-react'
import type { HowItsWorksProps } from '../.././../types/howWorks'

export const HowItsWorks: HowItsWorksProps[] = [
    {
        title: "Create Profile",
        description: "Build your professional profile by sharing your skills, experience, and projects.Showcase your expertise and connect with potential collaborators and employers.",
        icon: User,
        color: "from-blue-500 to-cyan-400",
        iconBg: "from-blue-500 to-cyan-400 bg-gradient-to-b",
        cardBg: "hover:bg-gradient-to-r hover:from-[#37635D] hover:to-[#1B3240] transition-colors ease-in duration-500",
    },
    {
        title: "Find Matches",
        description: "Find tasks that match your skills and interests.To make the most of your talents, explore diverse fields and projects that spark your curiosity. ",
        icon:Search,
        color: "from-purple-500 to-pink-500 w-90",
        iconBg: "from-purple-500 to-pink-500 bg-gradient-to-b text-light ",
        cardBg: "hover:bg-gradient-to-r hover:from-[#703753] hover:to-[#264457] transition-colors ease-in duration-500",
    },
    {
        title: "Start Working",
        description: "Connect with clients negotiate terms and begin your journey towards professional success. Craft compelling proposals that highlight your unique. ",
        icon:Briefcase,
        color: "from-green-500 to-lime-400 w-60",
        iconBg: "from-green-500 to-lime-400 bg-gradient-to-b ",
        cardBg: "hover:bg-gradient-to-r hover:from-[#315726] hover:to-[#40571A] transition-colors ease-in duration-500",
    }
]