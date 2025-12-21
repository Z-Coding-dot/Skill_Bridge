import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Section from "@/components/Section/Section";
import { User2Icon } from "lucide-react";
import { getProfile, updateProfile} from "@/api/profile.api";
import { ProfileSchema } from "@/schemas/profile.schema";
import { useRef, useState } from "react";
export const Setting = () => {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditingSkills, setIsEditingSkills] = useState<boolean>(false);
  const [skills, setSkills] = useState<ProfileSchema["skills"]>([]);
  
  const { data: profile, isPending } = useQuery<ProfileSchema>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["profile"]})})

  if (isPending || !profile) return <Section>Loading...</Section>;

  return (
    <Section>
      <div className="flex flex-col 2xl:flex-row items-start justify-between sm:gap-4">
        {/* Profile Info */}
        <div className="2xl:w-3/4 flex flex-col gap-4 bg-2card rounded-xl p-3 sm:p-6 mb-4 w-full">
          <h1 className="text-base sm:text-lg 2xl:text-2xl 3xl:text-3xl font-semibold tracking-tight">Profile Information  </h1>
          <div className="flex items-start sm:gap-5 gap-3 my-3 sm:my-5">
            {avatarPreview ? (
            <span className="p-1 rounded-full border-1 border-trinary">
              <img src={avatarPreview} className="size-16 sm:size-24 object-cover rounded-full" alt={profile.name} />
            </span>
            ) : (
            <span className="p-2 rounded-full border-1 border-trinary">
              <User2Icon className="size-16 sm:size-24" />
            </span>
            )}

            <input type="file" ref={fileRef} hidden accept="image/*"
             onChange={(e) => {const file = e.target.files?.[0];
              if(file){setAvatarPreview(URL.createObjectURL(file))}
             } } />

            <button onClick={() => fileRef.current?.click()} className="text-xs sm:text-sm mt-5 sm:mt-10 cursor-pointer">Change Profile Image</button>
          </div>

          {/* Form inputs  */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              updateProfileMutation.mutate({
                ...profile,
                name: formData.get("name") as string, 
                email: formData.get("email") as string,
                bio: formData.get("bio") as string,
              });
            }}   className="flex flex-col">
            <label htmlFor="name" className="text-xs sm:text-sm mb-1 text-trinary">Name</label>
            <input type="text" name="name" defaultValue={profile.name} className="sm:mb-5 text-xs sm:text-sm"/>
            <label htmlFor="email" className="text-xs sm:text-sm mb-1 text-trinary">Email</label>
            <input type="text" name="email" defaultValue={profile.email} className="sm:mb-5 text-xs sm:text-sm"/>
            <label htmlFor="bio" className="text-xs sm:text-sm mb-1 text-trinary">Bio</label>
            <textarea name="bio" defaultValue={profile.bio} className="text-xs sm:text-sm max-sm:mb-5" />
            <button type="submit" disabled={updateProfileMutation.isPending} className=" sm:w-40 sm:mt-4 text-xs sm:text-sm">
              {updateProfileMutation.isPending ? "Saving...": "Save Changes"}
            </button>
          </form>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-4 bg-2card rounded-xl p-6 2xl:w-1/3 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-base sm:text-lg 2xl:text-2xl 3xl:text-3xl font-semibold tracking-tight">
              Skills
            </h1>
            <button className="text-xs sm:text-sm" onClick={() => setIsEditingSkills(!isEditingSkills)}>{isEditingSkills ? "Done" : "Edit"}</button>
          </div>

          {isEditingSkills ?(
            <input
                type="text"
                placeholder="React, TypeScript, Tailwind"
                onBlur={(e) =>
                  setSkills(
                    e.target.value.split(",").map((s) => ({
                      id: crypto.randomUUID(),
                      label: s.trim(),
                    }))
                  )
                }
              />
          ) : (

            <div className="flex flex-wrap items-start gap-4 mt-8">
             {profile.skills?.map((skill) => (
            <span key={skill.id} className="bg-card-bg rounded-xl px-3 py-1 text-stone-100">
            {skill.label}</span> ))}
          </div> 
       )}
            
      </div>
      </div>
    </Section>
)}
