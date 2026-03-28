import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/layouts/Header/Header";
import MobileFooter from "@/layouts/Footer/MobileFooter";
import { ChatWindow } from "@/components/ui/Messages/ChatWindow";
import { ConversationList } from "@/components/ui/Messages/ConversationList";
import type { MessageType } from "@/schemas/message.schema";
import { conversationsMock, mockMessagesByUser } from "@/mock/dashboard.mock";

const CURRENT_USER_ID = "user-1";

export const Messages = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messagesByUser, setMessagesByUser] = useState<Record<string, MessageType[]>>(mockMessagesByUser);

  const activeUser = conversationsMock.find((u) => u.id === selectedUserId) ?? null;
  const activeMessages = selectedUserId ? (messagesByUser[selectedUserId] ?? []) : [];

  const handleSelectUser = (id: string) => setSelectedUserId(id);

  const handleBack = () => setSelectedUserId(null);

  const handleSendMessage = (text: string) => {
    if (!selectedUserId) return;

    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER_ID,
      receiverId: selectedUserId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setMessagesByUser((prev) => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] ?? []), newMessage],
    }));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex overflow-hidden mt-10 sm:mt-16">

        {/* Conversation list — always visible on desktop, hidden on mobile when chat is open */}
        <div className={`${selectedUserId ? "hidden md:flex" : "flex"} w-full sm:w-85 flex-col`}>
          <ConversationList
            users={conversationsMock}
            activeUserId={selectedUserId}
            onSelectUser={handleSelectUser}
          />
        </div>

        {/* Chat window — hidden on mobile when no user selected */}
        <div className={`${!selectedUserId ? "hidden md:flex" : "flex"} flex-1 flex-col`}>
          <ChatWindow
            activeUser={activeUser}
            messages={activeMessages}
            currentUserId={CURRENT_USER_ID}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        </div>

      </div>

      <MobileFooter />
    </div>
  );
};