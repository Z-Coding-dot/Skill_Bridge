import { Header } from "@/layouts/Header/Header";
import MobileFooter from "@/layouts/Footer/MobileFooter";
import { Skeleton } from "./Skeleton";

const ConversationItemSkeleton = () => (
  <div className="flex items-center gap-3 p-3">
    <Skeleton className="size-10 rounded-full shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton className="h-3.5 w-1/2" />
      <Skeleton className="h-3 w-3/4" />
    </div>
    <Skeleton className="h-3 w-8 shrink-0" />
  </div>
);

const ChatMessageSkeleton = ({ reverse = false }: { reverse?: boolean }) => (
  <div className={`flex items-end gap-2 ${reverse ? "flex-row-reverse" : ""}`}>
    <Skeleton className="size-8 rounded-full shrink-0" />
    <div className={`flex flex-col gap-1 ${reverse ? "items-end" : ""}`}>
      <Skeleton className="h-10 w-48 sm:w-64 rounded-2xl" />
      <Skeleton className="h-2.5 w-16" />
    </div>
  </div>
);

export const MessagesSkeleton = () => (
  <div className="flex flex-col h-screen">
    <Header />

    <div className="flex overflow-hidden mt-10 sm:mt-16">
      {/* Conversation List */}
      <div className="w-full sm:w-85 flex flex-col border-r border-gray-700">
        <div className="p-3 border-b border-gray-700">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
        <div className="flex flex-col divide-y divide-gray-700/50">
          {[...Array(7)].map((_, i) => (
            <ConversationItemSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="hidden md:flex flex-1 flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-4 p-4 flex-1">
          <ChatMessageSkeleton />
          <ChatMessageSkeleton reverse />
          <ChatMessageSkeleton />
          <ChatMessageSkeleton />
          <ChatMessageSkeleton reverse />
          <ChatMessageSkeleton reverse />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex items-center gap-3">
          <Skeleton className="h-10 flex-1 rounded-full" />
          <Skeleton className="size-10 rounded-full shrink-0" />
        </div>
      </div>
    </div>

    <MobileFooter />
  </div>
);