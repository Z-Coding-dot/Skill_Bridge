import { Clock } from "lucide-react"
import Section from "../../Section/Section"

export const Applications = () => {
  return (
    <Section className="-mx-4">
          <h1 className="mt-5 2xl:text-xl font-semibold mb-10">My Applications</h1>
        <div className="flex flex-col items-start bg-card-bg w-full rounded-xl p-6">
          <h3 className="mb-3">Web Design for Student Portfolio</h3>
          <span className="flex items-center text-xs gap-2 bg-accent rounded-2xl px-2 py-1 mb-5 text-stone-100"><Clock className="size-4"/>Pending</span>
            <div className="bg-accent flex flex-col items-start w-full p-4 rounded-xl">
                <p className="text-stone-400">Your Pitch:</p>
                <p className="text-stone-200">I have 3 years of experience in web design and have created multiple portfolio websites. I can deliver a modern, responsive design that perfectly showcases your work.</p>
            </div>
        </div>
    </Section>
  )
}

