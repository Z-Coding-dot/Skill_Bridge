import Section from "@/components/Section/Section";
import { Skeleton } from "./Skeleton";

export const NotificationsSkeleton = () => (
  <Section>
    <div className="flex flex-col gap-4 bg-2card w-full rounded-xl p-2 sm:p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 rounded-xl p-2 sm:p-4 bg-card-bg">
          <Skeleton className="size-5 mt-2 rounded-full shrink-0" />
          <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2 sm:gap-4">
            <div className="mr-5 w-full">
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-3 w-full mt-1 sm:mt-2" />
              <Skeleton className="h-3 w-2/3 mt-1" />
            </div>
            <div className="flex flex-col justify-between h-full max-sm:items-end shrink-0">
              <Skeleton className="hidden sm:block h-5 w-16 rounded-lg mb-3" />
              <Skeleton className="h-3 w-20 mt-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);
