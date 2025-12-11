import Section from "../../components/Section/Section"
import { Edit, User } from "lucide-react"
// import { useContext } from "react";
// import { mockTasks } from "@/lib/consts/mockTasks/mockTask.data";
// import { useAuth } from "@/context/AuthContext";


export const Profile = () => {
    // const {userId} = useParams();
    // const {user} = useContext(useAuth);

    // const isOwnProfile = user?.id === userId;
    // const profileData = isOwnProfile ? user : {
    //  id: userId,
    // name: 'Sarah Johnson',
    // email: 'sarah@example.com',
    // bio: 'Marketing student passionate about social media and content creation. Looking for opportunities to grow my skills and help businesses reach their audience.',
    // avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    // skills: ['Social Media Marketing', 'Content Writing', 'Canva', 'Analytics']
    // };

    // const userTasks = mockTasks.filter((task) => task.postedBy.id === userId);
    return(
        <Section>
            <div className="mt-25 flex flex-row justify-center gap-4">
                <div className="w-1/3 flex flex-col items-center gap-4">
                    <div className="rounded-lg bg-card-bg p-6 w-full flex flex-col items-center gap-4">
                        <User className="size-40" />
                        <h2>Parsa Karimi</h2>
                        <p>example@gmail.com</p>
                        <button className="flex items-center gap-3 w-full justify-center"><Edit className="size-5"/>Edit Profile</button>
                    </div>
                    <div className="rounded-lg bg-card-bg p-6 w-full flex flex-col items-start">
                        <h2 className="mb-5">Skills</h2>
                        <div className="flex items-start justify-start gap-2 flex-wrap">
                        <p className="px-2 py-1 rounded-full bg-2card text-trinary">Social Media Marketing</p>
                        <p className="px-2 py-1 rounded-full bg-2card text-trinary">Content Writing</p>
                        <p className="px-2 py-1 rounded-full bg-2card text-trinary">Canva</p>
                        <p className="px-2 py-1 rounded-full bg-2card text-trinary">Analytics</p>
                        </div>
                    </div>
                </div>

                <div className="w-2/3 flex flex-col gap-4">
                    <div className="w-full p-6 rounded-lg bg-card-bg">
                        <h2 className="mb-5">About</h2>
                        <p>Computer Science student passionate about web development</p>
                    </div>
                    <div className="w-full p-6 rounded-lg bg-card-bg">
                        <h2 className="mb-5">Posted Tasks (0)</h2>
                        <p className="text-center mb-5">No tasks posted yet</p>
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