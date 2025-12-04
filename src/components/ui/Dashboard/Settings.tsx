import { li, span } from "framer-motion/client"
import Section from "../../Section/Section"

type skills = {
  id: string,
  label: string
}

export const Setting = () => {
  const SkillList: skills[] = [
    {id: 'react', label: "React"},
    {id: 'java', label: "Java"},
    {id: 'javaScript', label: "JavaScript"},
    {id: 'typeScript', label: "TypeScript"},
    {id: 'flutter', label: "Flutter"},
  ]
  return (
    <Section className="-mx-4">
      <h1 className="mt-5 2xl:text-xl font-semibold mb-10">Settings</h1>
      <div className="flex flex-col gap-4 bg-card-bg w-full rounded-xl p-6 mb-4">
        <h1>Profile Information</h1>

      </div>
      <div className="flex flex-col gap-4 bg-card-bg w-full rounded-xl p-6">
        <div className="flex items-center justify-between">
        <h1>Skills</h1>
        <button>Edit</button>
        </div>
        <div className="flex items-start gap-4 mt-8">
          {SkillList.map((list) => (
            <span key={list.id} className="bg-accent rounded-xl px-3 py-1 text-stone-100">
                {list.label}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}

