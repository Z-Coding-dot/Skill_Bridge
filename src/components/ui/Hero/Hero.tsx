import Section from "../../Section/Section";
import DarkVeil from "./Hero_background/Background";
import * as m from 'motion/react-client'

export default function Hero() {
  return (
    <Section>
        {/* Background Layer */}
        <div className="absolute inset-0 -z-20">
       <DarkVeil />
        </div>
      <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <m.h1
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }} className="text-3xl sm:text-5xl font-bold mb-4">
            Connect Talent. Build Skills. Get Hired.
          </m.h1>
          <m.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
           className="max-w-xl text-[var(--text-secondary)]">
            SkillBridge links students, freelancers, and companies through real-world tasks, internships, and projects.
          </m.p>
          <div className="mt-14 flex gap-3">
            <m.button initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0 }} className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg">
              Explore Tasks
            </m.button>
            <m.button initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3 }} className="bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-2 rounded-lg">
              Post a Task
            </m.button>
          </div>
        </div>
      </div>
    </Section>
  );
}
