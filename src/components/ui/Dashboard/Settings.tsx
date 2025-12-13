import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section/Section";
import { User2Icon } from "lucide-react";
import { getProfile, updateProfile, type Profile } from "@/api/profile.api";
export const Setting = () => {

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading || !profile) return <Section>Loading...</Section>;

  return (
    <Section>
      <div className="flex items-start justify-between gap-4">
        {/* Profile Info */}
        <div className="2xl:w-3/4 flex flex-col gap-4 bg-2card rounded-xl p-6 mb-4">
          <h1 className="2xl:text-2xl 3xl:text-3xl font-semibold tracking-tight">
            Profile Information
          </h1>

          <div className="flex items-start gap-5 my-5">
            <span className="p-2 rounded-full border-1 border-trinary">
              <User2Icon className="size-16" />
            </span>
            <button className="mt-5 cursor-pointer">Change Profile Image</button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as typeof e.target & {
                name: { value: string };
                email: { value: string };
                bio: { value: string };
              };
              updateProfile({
                ...profile,
                name: form.name.value,
                email: form.email.value,
                bio: form.bio.value,
              });
            }}
            className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={profile.name}
              className="mb-5"/>

            <label htmlFor="email">Email</label>
            <input
              type="text" name="email" defaultValue={profile.email} className="mb-5"/>
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" defaultValue={profile.bio} />

            <button type="submit" className="w-40 mt-4">
              Save Changes
            </button>
          </form>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-4 bg-2card rounded-xl p-6 w-1/3">
          <div className="flex items-center justify-between">
            <h1 className="2xl:text-2xl 3xl:text-3xl font-semibold tracking-tight">
              Skills
            </h1>
            <button>Edit</button>
          </div>

         <div className="flex flex-wrap items-start gap-4 mt-8">
        {profile?.skills.map((skill) => (
          <span key={skill.id} className="bg-card-bg rounded-xl px-3 py-1 text-stone-100">
          {skill.label}
        </span> 
        ))}
        
      </div>
        
        <span className="text-stone-400">No skills added.</span>
        </div>
      </div>
    </Section>
)}
