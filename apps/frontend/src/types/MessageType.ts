
export type MessageType = {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  createdAt: string;
  isRead: boolean;
};

export type ChatUser = {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
};