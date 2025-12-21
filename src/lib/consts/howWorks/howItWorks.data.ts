import { BriefcaseBusiness, SearchCheck, User } from 'lucide-react'
import type { HowItsWorksProps } from '../.././../types/howWorks'

export const HowItsWorks: HowItsWorksProps[] = [
    {
        title: "Create Profile",
        description: "Build your professional profile by sharing your skills, experience, and projects.Showcase your expertise and connect with potential collaborators and employers.",
        icon: User,
    },
    {
        title: "Find Matches",
        description: "Find tasks that match your skills and interests.To make the most of your talents, explore diverse fields and projects that spark your curiosity. ",
        icon:SearchCheck,
    },
    {
        title: "Start Working",
        description: "Connect with clients negotiate terms and begin your journey towards professional success. Craft compelling proposals that highlight your unique. ",
        icon:BriefcaseBusiness,
    }
]