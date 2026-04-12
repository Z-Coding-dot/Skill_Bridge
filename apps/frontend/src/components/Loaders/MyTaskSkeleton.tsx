import Section from "@/components/Section/Section";
import { Skeleton } from "./Skeleton";

export const MyTaskSkeleton = () => (
  <Section>
    {/* Header */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>

    {/* Task Cards */}
    <ul className="mt-10 space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-2card rounded-xl flex flex-col-reverse sm:flex-row items-center sm:justify-between">
          <div className="p-2 sm:p-5 w-full">
            <Skeleton className="h-5 w-1/3 mb-4" />
            <Skeleton className="h-3.5 w-full mb-2" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
          <div className="flex justify-between items-center w-full sm:w-auto gap-4 sm:flex-col p-2 sm:p-5">
            <Skeleton className="h-6 w-16 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-lg" />
          </div>
        </div>
      ))}
    </ul>
  </Section>
);