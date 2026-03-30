import Section from "@/components/Section/Section";
import { Skeleton } from "./Skeleton";

export const ApplicationsSkeleton = () => (
  <Section>
    <div className="space-y-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col items-start bg-2card w-full rounded-xl p-2 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-6 w-full">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-20 rounded-lg" />
          </div>
          <div className="bg-card-bg flex flex-col items-start w-full p-2 sm:p-4 rounded-xl">
            <Skeleton className="h-3 w-20 mb-3" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  </Section>
);