import type { ChatUser } from "@/schemas/message.schema";
import { Search, User } from "lucide-react";
import { useState } from "react";
import { getAvatarUrl } from "../../../../../backend/src/utils/avatar";
import MobileFooter from "@/layouts/Footer/MobileFooter";


type ConversationListProps = {
  users: ChatUser[];
  activeUserId: string | null;
  onSelectUser: (id: string) => void;
};

export const ConversationList = ({ users, activeUserId, onSelectUser }: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatConversationTime = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="w-full border-r border-[var(--border)] bg-card-bg flex flex-col h-screen">
      <div className="p-4 border-b border-[var(--border)]">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg)] border-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          <Search className="absolute left-3 top-2.5 text-[var(--text-secondary)] size-4" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 && (
          <p className="text-center text-sm text-[var(--text-secondary)] mt-10">
            No conversations found.
          </p>
        )}
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors hover:bg-[var(--bg)] ${
              activeUserId === user.id ? "bg-[var(--bg)] border-l-4 border-[var(--primary)]" : ""
            }`}
          >
            {/* {user.avatar
              ? <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              : <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0"><User className="size-5 text-white" /></span>
            } */}
             {user.avatar ? (
                                <img
                                  src={getAvatarUrl(user.avatar)}
                                  alt={user.name}
                                  className="w-8 h-8 object-cover rounded-full mt-2 mb-1"
                                />
                              ) : (
                                <span className="w-8 h-8 rounded-full mt-2 mb-1 bg-primary flex items-center justify-center">
                                  <User className="size-5 text-white" />
                                </span>
                              )}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                {user.lastMessageAt && (
                  <span className="text-xs text-[var(--text-secondary)]">
                    {formatConversationTime(user.lastMessageAt)}
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--text-secondary)] truncate">
                {user.lastMessage}
              </p>
            </div>
            {user.unreadCount && user.unreadCount > 0 ? (
              <span className="bg-[var(--primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                {user.unreadCount}
              </span>
            ) : null}
          </div>
        ))}
      </div>
        <MobileFooter/>
    </div>
  );
};
