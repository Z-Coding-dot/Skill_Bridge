import Section from "../../Section/Section"
import { HowItsWorks } from "../../../lib/consts/howWorks/howItWorks.data"
import * as m from 'motion/react-client'

export const HowWorks = () => {
  return (
    <Section>
      <h1 className="text-center text-lg sm:text-4xl font-bold mb-4 sm:mb-16">How it <span className="text-[var(--accent)]">Works</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {HowItsWorks.map((card, index) => (
            <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 * index }}
             key={card.title} className={`card sm:p-8 transition-all duration-500 ${card.cardBg}`}>

                <span className={`${card.iconBg} size-12 rounded-xl p-3 flex items-center justify-center mb-4`}>
                <card.icon className="size-8 font-bold text-white"/>
                </span>
                <h3 className="text-xl font-bold mb-6">{card.title}</h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6">{card.description}</p>
                <div className={`h-[5px] mt-12 rounded-full bg-gradient-to-r hover:${card.color} mb-4`} />
            </m.div>
        ))}
      </div>
    </Section>
  )
}

