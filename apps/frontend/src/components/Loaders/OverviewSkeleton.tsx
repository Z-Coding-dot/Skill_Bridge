import Section from "@/components/Section/Section";
import { Skeleton } from "./Skeleton";


export const OverviewSkeleton = () => (
  <Section>
    {/* Stats Cards */}
    <div className="sm:mt-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4 rounded-2xl w-full mb-3 bg-2card">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-7 w-16" />
            </div>
            <Skeleton className="size-6 2xl:size-8 rounded" />
          </div>
        ))}
      </div>
    </div>

    {/* Recent Activity */}
    <div className="rounded-2xl sm:p-5 sm:mt-10">
      <Skeleton className="h-5 w-36 mx-auto mb-4" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center bg-2card rounded-2xl sm:px-6 px-3 py-2 sm:py-4 gap-4 mb-3">
          <Skeleton className="size-5 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  </Section>
);