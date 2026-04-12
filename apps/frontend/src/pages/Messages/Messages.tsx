import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/layouts/Header/Header";
import MobileFooter from "@/layouts/Footer/MobileFooter";
import { ChatWindow } from "@/components/ui/Messages/ChatWindow";
import { ConversationList } from "@/components/ui/Messages/ConversationList";
import { getConversationMessages, getConversations, markConversationAsRead, sendMessage } from "@/api/messages.api";
import { useAuth } from "@/context/useAuth";
import type { Conversation, Message } from "@/schemas/message.schema";
import { MessagesSkeleton } from "@/components/Loaders/MessagesSkeleton";
import { useLocation } from "react-router-dom";

export const Messages = () => {
  const location = useLocation();
  const locationState = location.state as {
    receiverId?: string;
    initialMessage?: string;
    receiverName?: string;
    receiverAvatar?: string;
  } | null;

  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isMobile = () => window.innerWidth < 640;

  const [selectedUserId, setSelectedUserId] = useState<string | null>(
   isMobile() ? null : (locationState?.receiverId ?? null),
  );
  const [userWentBack, setUserWentBack] = useState(false);

  const { data: conversations = [], isPending } = useQuery<Conversation[]>({
    queryKey: ["message-conversations"],
    queryFn: getConversations,
    enabled: Boolean(user),
  });

  // Auto-select first conversation only when not coming from Apply and user didn't go back
  useEffect(() => {
    if (!selectedUserId && !locationState?.receiverId && !userWentBack && conversations.length > 0) {
      setSelectedUserId(conversations[0].id);
    }
  }, [conversations, selectedUserId, locationState?.receiverId, userWentBack]);

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["message-thread", selectedUserId],
    queryFn: () => getConversationMessages(selectedUserId!),
    enabled: Boolean(selectedUserId),
  });

  useEffect(() => {
    if (!selectedUserId) return;
    markConversationAsRead(selectedUserId)
      .then(() => queryClient.invalidateQueries({ queryKey: ["message-conversations"] }))
      .catch((error) => console.error("Unable to mark conversation as read", error));
  }, [queryClient, selectedUserId]);

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["message-conversations"] }),
        queryClient.invalidateQueries({ queryKey: ["message-thread", variables.receiverId] }),
      ]);
    },
  });

  const fallbackUser = useMemo(() => {
    if (!locationState?.receiverId || !locationState?.receiverName) return null;
    return {
      id: locationState.receiverId,
      name: locationState.receiverName,
      avatar: locationState.receiverAvatar ?? "",
      lastMessage: "",
      unreadCount: 0,
    };
  }, [locationState?.receiverId, locationState?.receiverName, locationState?.receiverAvatar]);

  const activeUser =
    conversations.find((c) => c.id === selectedUserId) ??
    (selectedUserId === locationState?.receiverId ? fallbackUser : null);

  const activeMessages = selectedUserId ? messages : [];

  const conversationList = useMemo(() => {
    return conversations.map((c) =>
      c.id !== selectedUserId ? c : { ...c, unreadCount: 0 },
    );
  }, [conversations, selectedUserId]);

  const handleSelectUser = (id: string) => {
    setUserWentBack(false);
    setSelectedUserId(id);
  };

  const handleBack = () => {
    setUserWentBack(true);
    setSelectedUserId(null);
    window.history.replaceState({}, "");
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedUserId) return;
    window.history.replaceState({}, "");
    await sendMessageMutation.mutateAsync({ receiverId: selectedUserId, text });
  };

  if (!user) return null;
  if (isPending) return <MessagesSkeleton />;

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
            initialMessage={
              selectedUserId === locationState?.receiverId
                ? locationState?.initialMessage ?? ""
                : ""
            }
          />
        </div>
      </div>

      <MobileFooter />
    </div>
  );
};