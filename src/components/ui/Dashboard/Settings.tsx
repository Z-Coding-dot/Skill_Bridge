import Section from "@/components/Section/Section";
import { User2Icon } from "lucide-react";

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
      <div className="flex flex-col gap-4 bg-2card w-full rounded-xl p-6 mb-4">
        <h1>Profile Information</h1>
        <div className="flex items-start gap-5 my-5">
          <span className="p-2 rounded-full border-1 border-trinary ">
          <User2Icon className="size-16" />
          </span>
          <button className="mt-5 cursor-pointer">Change Profile image</button>
        </div>

        <form action="#" className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Parsa" className="mb-5"/>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="example@gmail.com" className="mb-5" />
          <label htmlFor="bio">Bio</label>
          <textarea name="bio" id="bio" placeholder="Computer Science student passionate about web development"/>
        </form>
          <button className="w-40">Save Changes</button>
      </div>
      <div className="flex flex-col gap-4 bg-2card w-full rounded-xl p-6">
        <div className="flex items-center justify-between">
        <h1>Skills</h1>
        <button>Edit</button>
        </div>
        <div className="flex items-start gap-4 mt-8">
          {SkillList.map((list) => (
            <span key={list.id} className="bg-card-bg rounded-xl px-3 py-1 text-stone-100">
                {list.label}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}

