import type { HowItsWorksProps } from '../.././../types/howWorks'
import { BadgePercent, BicepsFlexed, BookOpen, Briefcase, CodeIcon, SquarePen } from 'lucide-react'


export const exploreCategories: HowItsWorksProps[] = [
    {
        title: "Development",
        description: "Web, Mobile & Software",
        opportunities: "265 Opportunities",
        icon: CodeIcon,
    },
    {
        title: "Tutoring",
        description: "Share & gain knowledge",
        opportunities: "83 Opportunities",
        icon: BookOpen,
    },
    {
        title: "Marketing",
        description: "Web, Mobile & Software",
        opportunities: "265 Opportunities",
        icon: BadgePercent,
    },
    {
        title: "Writing",
        description: "Web, Mobile & Software",
        opportunities: "265 Opportunities",
        icon: SquarePen,
    },
    {
        title: "Gigs",
        description: "Quick task and freelance work",
        opportunities: "265 Opportunities",
        icon: Briefcase,
    },
    {
        title: "Internships",
        description: "Real-world experience opportunities",
        opportunities: "25 Opportunities",
        icon: BicepsFlexed,
    },

]