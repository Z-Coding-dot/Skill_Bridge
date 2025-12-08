import { Briefcase, Plus } from "lucide-react"
import Section from "@/components/Section/Section"

export const MyTask = () => {
    return(
        <Section className="-mx-4">
            <div className="flex items-center justify-between mt-5">
            <h1 className="2xl:text-xl font-semibold">My Posted Tasks</h1>
            <button className="flex items-center gap-2 2xl:text-base"><Plus className="size-5 font-bold"/>Add Task</button>
            </div>
            <div className="flex flex-col items-center justify-center bg-2card w-full rounded-2xl mt-10 p-12">
                <Briefcase className="size-12 mb-8"/>
                <p className="mb-12">You haven't posted any tasks yet</p>
                <button className="flex items-center gap-2 2xl:text-base tracking-tighter"><Plus className="size-5 font-bold"/>Post Your First Task</button>

            </div>
        </Section>
    )
}