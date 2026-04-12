import Section from "@/components/Section/Section";
import { Skeleton } from "./Skeleton";

export const TaskBoardSkeleton = () => (
  <Section>
    {/* Heading */}
    <div className="flex flex-col items-center mt-25 sm:mt-32 mb-10 gap-3">
      <Skeleton className="h-8 sm:h-12 w-72 sm:w-96" />
      <Skeleton className="h-4 w-64 sm:w-80" />
    </div>

    {/* Search & Filter */}
    <div className="mb-8">
      <Skeleton className="h-10 max-w-lg mx-auto rounded-lg" />
      <div className="max-w-lg mx-auto mt-4 flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded" />
        ))}
      </div>
    </div>

    {/* Results bar */}
    <Skeleton className="h-9 rounded-lg mb-6 sm:mx-20" />

    {/* Task Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="card max-sm:p-3">
          <div className="flex justify-end mb-3">
            <Skeleton className="h-5 w-16 rounded-xl" />
          </div>
          <Skeleton className="h-5 w-3/4 mb-3" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-2/3 mb-4" />
          <div className="flex justify-between items-center my-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center gap-3 mt-2 mb-1">
            <Skeleton className="size-8 rounded-full shrink-0" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-9 w-full mt-4 rounded-md" />
        </div>
      ))}
    </div>
  </Section>
);