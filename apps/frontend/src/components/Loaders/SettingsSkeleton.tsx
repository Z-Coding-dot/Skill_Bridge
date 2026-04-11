import Section from "@/components/Section/Section";
import { Skeleton } from "./Skeleton";

export const SettingSkeleton = () => (
  <Section>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col 2xl:flex-row items-start justify-between sm:gap-4">

        {/* Profile Info */}
        <div className="2xl:w-3/4 flex flex-col gap-4 bg-2card rounded-xl p-3 sm:p-6 mb-4 w-full">
          <Skeleton className="h-6 w-44" />

          {/* Avatar */}
          <div className="flex items-start gap-3 sm:gap-5 my-3 sm:my-5">
            <Skeleton className="size-16 sm:size-24 rounded-full shrink-0" />
            <Skeleton className="h-4 w-36 mt-5 sm:mt-10" />
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4">
            {["Name", "Email", "Bio"].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <Skeleton className="h-3 w-10" />
                <Skeleton className={`w-full rounded ${field === "Bio" ? "h-20" : "h-9"}`} />
              </div>
            ))}
            <Skeleton className="h-9 w-full sm:w-40 rounded-lg mt-1" />
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-4 bg-2card rounded-xl p-6 2xl:w-1/3 w-full">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex flex-wrap items-start gap-4 mt-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-xl" />
            ))}
          </div>
        </div>

      </div>
    </div>
  </Section>
);
