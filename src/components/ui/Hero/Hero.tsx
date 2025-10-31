import { Link } from "react-router-dom";
import Section from "../../Section/Section";
import DarkVeil from "./Hero_background/Background";
import * as m from 'motion/react-client'

export default function Hero() {
  return (
    <Section>
        {/* Background Layer */}
        <div className="hidden sm:block absolute inset-0 -z-20">
       <DarkVeil />
        </div>
      <div className="relative w-full max-sm:mt-16 min-h-100 sm:min-h-dvh flex justify-center items-center overflow-hidden">
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center sm:px-4 px-3">
          <m.span 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
           className="absolute -top-8 left-8 rounded-2xl backdrop-blur-3xl bg-transparent shadow-xl py-1 px-2 max-sm:text-xs">Built for Students, By Students</m.span>
          <m.h1
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }} className="text-2xl sm:text-5xl font-bold mb-4">
            Connect Talent. Build Skills. Get Hired.
          </m.h1>
          <m.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
           className="max-w-xl text-[var(--text-secondary)] text-xs sm:text-sm leading-4">
            The marketplace where students find gigs, internships, and tutoring opportunities. Build experience, earn money, and grow your network.
          </m.p>
          <div className="mt-14 flex gap-3">
            <Link to="/taskBoard">
            <m.button initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0 }} 
                  className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-xs sm:text-base">
                   Explore Tasks
            </m.button>
            </Link>
            <Link to="#">
            <m.button initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.3 }} 
                      className="bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-primary)] px-4 py-2 rounded-lg
                              hover:bg-[var(--accent)] transition-colors duration-500 ease-in-out text-xs sm:text-base">
                       Post a Task
            </m.button></Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
