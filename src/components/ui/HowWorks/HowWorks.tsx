import Section from "../../Section/Section"
import { HowItsWorks } from "../../../lib/consts/howWorks/howItWorks.data"
import SpotlightCard from "@/components/Card/SpotlightCard"
import * as m from "motion/react-client"


export const HowWorks = () => {
  return (
    <Section>
      <h1 className="text-center text-xl sm:text-2xl lg:text-4xl font-bold mb-3">How it Works</h1>
       <p className="sm:mb-16 mb-6 text-center text-xs sm:text-xs lg:text-base">Discover our seamless three-step process designed to turn your complex challenges into simple, actionable results.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {HowItsWorks.map((card, index) => (
          <m.div
          initial={{ opacity: 0, y: 20 }}
			    whileInView={{ opacity: 1, y: 0 }}
			    transition={{ duration: 0.3, delay: 0.2 * index }}
           key={card.title} >

            <SpotlightCard className={`sm:px-4 lg:p-8`}>
                <card.icon className="size-10 font-bold text-white mb-3"/>
                <h3 className="text-lg sm:text-xl font-bold mb-3 lg:mb-5">{card.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-[var(--text-secondary)] mb-3 lg:mb-6 line-clamp-3">{card.description}</p>
            </SpotlightCard>
          </m.div>
        ))}
      </div>
    </Section>
  )
}

