import Section from "@/components/Section/Section";
import { Skeleton } from "./Skeleton";

export const TaskDetailsSkeleton = () => (
  <Section>
    {/* Breadcrumb */}
    <Skeleton className="h-4 w-28 mt-10 sm:mt-24 sm:ml-8" />

    <div className="flex flex-col sm:flex-row gap-6 xl:gap-10 my-10 sm:mx-10">
      {/* First column */}
      <div className="flex-2 border border-[var(--border)] p-6 rounded-t-xl sm:rounded-l-xl">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-7 w-24 rounded-xl" />
        </div>

        <div className="my-5 w-full h-0.5 bg-[var(--border)]" />

        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-7 w-16 rounded-lg" />
        </div>

        <div className="mt-8 mb-12 flex flex-col gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>

        <div className="my-5 w-full h-[0.2px] bg-[var(--border)]" />
        <Skeleton className="h-5 w-24 mb-5" />

        {["Posted", "Deadline"].map((label) => (
          <div key={label}>
            <div className="flex items-center justify-between mt-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="my-5 w-full h-[0.2px] bg-[var(--border)]" />
          </div>
        ))}
      </div>

      {/* Second column */}
      <div className="flex-1 flex flex-col justify-between border border-[var(--border)] p-6 rounded-b-xl sm:rounded-r-xl">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Skeleton className="h-5 w-24 mb-5" />
            <Skeleton className="size-16 sm:size-18 rounded-full mt-2 mb-1" />
          </div>
          <div className="flex flex-col items-start mt-10 gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <Skeleton className="h-11 w-full mt-10 rounded" />
      </div>
    </div>
  </Section>
);