import Section from "@/components/Section/Section";
import { Header } from "@/layouts/Header/Header";
import { Skeleton } from "./Skeleton";

export const ProfileSkeleton = () => (
  <>
    <Header />
    <Section>
      <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4 mb-16">

        {/* Left column */}
        <div className="sm:w-1/3 flex flex-col items-center gap-4">
          <div className="rounded-lg bg-card-bg p-3 sm:p-5 w-full flex flex-col items-center gap-4">
            <Skeleton className="size-40 rounded-full" />
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-28 mt-1" />
          </div>
          <div className="bg-card-bg rounded-lg w-full">
            <Skeleton className="h-4 w-16 m-4" />
            <hr className="text-primary" />
            <div className="flex items-center p-2 sm:p-4 gap-4 flex-wrap">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-7 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="sm:w-2/3 flex flex-col gap-4">
          {["About", "Posted Tasks", "Portfolio"].map((section) => (
            <div key={section} className="w-full p-6 rounded-lg bg-card-bg">
              <Skeleton className="h-4 w-24 mb-5" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-5/6 mb-2" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          ))}
        </div>

      </div>
    </Section>
  </>
);
