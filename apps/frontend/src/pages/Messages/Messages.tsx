import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/layouts/Header/Header";
import MobileFooter from "@/layouts/Footer/MobileFooter";
import { ChatWindow } from "@/components/ui/Messages/ChatWindow";
import { ConversationList } from "@/components/ui/Messages/ConversationList";
import {
  getConversationMessages,
  getConversations,
  markConversationAsRead,
  sendMessage,
} from "@/api/messages.api";
import { useAuth } from "@/context/AuthContext";
import type { Conversation, Message } from "@/schemas/message.schema";

export const Messages = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const {
    data: conversations = [],
  } = useQuery<Conversation[]>({
    queryKey: ["message-conversations"],
    queryFn: getConversations,
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (!selectedUserId && conversations.length > 0) {
      setSelectedUserId(conversations[0].id);
    }
  }, [conversations, selectedUserId]);

  const {
    data: messages = [],
  } = useQuery<Message[]>({
    queryKey: ["message-thread", selectedUserId],
    queryFn: () => getConversationMessages(selectedUserId!),
    enabled: Boolean(selectedUserId),
  });

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    markConversationAsRead(selectedUserId)
      .then(() =>
        queryClient.invalidateQueries({ queryKey: ["message-conversations"] }),
      )
      .catch((error) => {
        console.error("Unable to mark conversation as read", error);
      });
  }, [queryClient, selectedUserId]);

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["message-conversations"] }),
        queryClient.invalidateQueries({
          queryKey: ["message-thread", variables.receiverId],
        }),
      ]);
    },
  });

  const activeUser =
    conversations.find((conversation) => conversation.id === selectedUserId) ?? null;
  const activeMessages = selectedUserId ? messages : [];

  const conversationList = useMemo(() => {
    return conversations.map((conversation) => {
      if (conversation.id !== selectedUserId) {
        return conversation;
      }

      return {
        ...conversation,
        unreadCount: 0,
      };
    });
  }, [conversations, selectedUserId]);

  const handleSelectUser = (id: string) => setSelectedUserId(id);

  const handleBack = () => setSelectedUserId(null);

  const handleSendMessage = async (text: string) => {
    if (!selectedUserId) return;

    await sendMessageMutation.mutateAsync({
      receiverId: selectedUserId,
      text,
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex overflow-hidden mt-10 sm:mt-16">
        <div className={`${selectedUserId ? "hidden md:flex" : "flex"} w-full sm:w-85 flex-col`}>
          <ConversationList
            users={conversationList}
            activeUserId={selectedUserId}
            onSelectUser={handleSelectUser}
          />
        </div>

        <div className={`${!selectedUserId ? "hidden md:flex" : "flex"} flex-1 flex-col`}>
          <ChatWindow
            activeUser={activeUser}
            messages={activeMessages}
            currentUserId={user.id}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        </div>
      </div>
      <MobileFooter />
    </div>
  );
};
