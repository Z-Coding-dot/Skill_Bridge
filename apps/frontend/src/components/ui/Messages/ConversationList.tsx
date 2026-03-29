import type { ChatUser } from "@/schemas/message.schema";
import { Search } from "lucide-react";

type ConversationListProps = {
  users: ChatUser[];
  activeUserId: string | null;
  onSelectUser: (id: string) => void;
};

export const ConversationList = ({ users, activeUserId, onSelectUser }: ConversationListProps) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 border-r border-[var(--border)] bg-card-bg flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg)] border-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          <Search className="absolute left-3 top-2.5 text-[var(--text-secondary)] size-4" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors hover:bg-[var(--bg)] ${
              activeUserId === user.id ? "bg-[var(--bg)] border-l-4 border-[var(--primary)]" : ""
            }`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                {user.lastMessageTime && (
                  <span className="text-xs text-[var(--text-secondary)]">{user.lastMessageTime}</span>
                )}
              </div>
              <p className="text-sm text-[var(--text-secondary)] truncate">
                {user.lastMessage}
              </p>
            </div>
            {user.unreadCount && user.unreadCount > 0 ? (
              <span className="bg-[var(--primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {user.unreadCount}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
