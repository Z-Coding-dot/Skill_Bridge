import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section/Section";
import { User } from "lucide-react";
import { getProfileById } from "@/api/profile.api";
import type { ProfileSchema } from "@/schemas/profile.schema";
import { useParams } from "react-router-dom";
import { Header } from "@/layouts/Header/Header";
import { ProfileSkeleton } from "@/components/Loaders/ProfileSkeleton";

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();

  const { data: profile, isPending } = useQuery<ProfileSchema>({
    queryKey: ["user-profile", id],
    queryFn: () => getProfileById(id!),
    enabled: Boolean(id),
  });

  if (isPending || !profile) return <ProfileSkeleton />;

  return (
    <>
      <Header />
      <Section>
        <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <div className="sm:w-1/3 flex flex-col items-center gap-4">
            <div className="rounded-lg bg-card-bg p-3 sm:p-5 w-full flex flex-col items-center gap-4">
              {profile.avatar
              ? <img src={profile.avatar} alt={profile.name} className="size-40 rounded-full object-cover" />
              : <User className="size-40" />
            }
              <h2 className="text-xl 2xl:text-3xl font-semibold font-sans capitalize">
                {profile.name}
              </h2>
            </div>

            <div className="bg-card-bg rounded-lg w-full">
              <h2 className="text-start p-4">Skills</h2>
              <hr className="text-primary" />
              <div className="flex items-center p-2 sm:p-4 gap-4 flex-wrap">
                {profile.skills.map((skill) => (
                  <p key={skill.id} className="px-3 py-1 rounded-full bg-2card text-trinary">
                    {skill.label}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="sm:w-2/3 flex flex-col gap-4">
            <div className="w-full p-6 rounded-lg bg-card-bg">
              <h2 className="mb-5">About</h2>
              <p>{profile.bio}</p>
            </div>
            <div className="w-full p-6 rounded-lg bg-card-bg">
              <h2 className="mb-5">Portfolio</h2>
              <p className="text-center mb-5">No portfolio items yet</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};