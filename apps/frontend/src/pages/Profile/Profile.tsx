import { useQuery } from "@tanstack/react-query"
import Section from "../../components/Section/Section"
import { Edit, User } from "lucide-react"
import { getProfile } from "@/api/profile.api"
import {ProfileSchema } from "@/schemas/profile.schema"
import { getMyTasks } from "@/api/tasks.api"
import type { Task } from "@/schemas/task.schema"

export const Profile = () => {
    const {data: profile, isLoading} = useQuery<ProfileSchema>({
        queryKey: ["profile"],
        queryFn: getProfile})

    const { data = [] } = useQuery<Task[]>({
       queryKey: ["my-tasks"],
       queryFn: getMyTasks,
     });

if (isLoading || !profile) return <Section>Loading...</Section>;

    return(
        <Section>
            <div className="mt-25 flex flex-row justify-center gap-4">
                <div className="w-1/3 flex flex-col items-center gap-4">
                    <div className="rounded-lg bg-card-bg p-6 w-full flex flex-col items-center gap-4">
                        <User className="size-40" />
                        <h2 className="2xl:text-2xl font-semibold font-sans capitalize">{profile.name}</h2>
                        <p>{profile.email}</p>
                        <button className="flex items-center gap-3 w-full justify-center"><Edit className="size-5"/>Edit Profile</button>
                    </div>
                    <div className="bg-card-bg rounded-lg w-full ">
                    <h2 className="text-start p-4">Skills</h2>
                    <hr className="text-primary" />
                    <div className="flex items-center p-6 gap-4 flex-wrap">
                        {profile.skills.map((skill) => (
                        <div key={skill.id} className="flex items-start justify-start">
                        <p className="px-3 py-1 rounded-full bg-2card text-trinary">{skill.label}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                <div className="w-2/3 flex flex-col gap-4">
                    <div className="w-full p-6 rounded-lg bg-card-bg">
                        <h2 className="mb-5">About</h2>
                        <p>{profile.bio}</p>
                    </div>
                    <div className="w-full p-6 rounded-lg bg-card-bg">
                        <h2 className="mb-5">Posted Tasks</h2>
                        {data.length === 0 ? (
                            <p className="text-center mb-5">No tasks posted yet</p>
                        ): (
                            <ul>
                                {data.map((task) => (
                                    <li key={task.id} className="mb-4">{task.title}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="w-full p-6 rounded-lg bg-card-bg">
                        <h2 className="mb-5">Portfolio</h2>
                        <p className="text-center mb-5">No portfolio items yet</p>
                    </div>
                </div>
            </div>
        </Section>
    )
}