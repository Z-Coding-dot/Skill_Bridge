import type { ChatUser, MessageType } from "@/schemas/message.schema";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChatWindowProps = {
  activeUser: ChatUser | null;
  messages: MessageType[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
  onBack?: () => void;
};

export const ChatWindow = ({
  activeUser,
  messages,
  currentUserId,
  onSendMessage,
  onBack,
}: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatMessageTime = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--bg)] text-[var(--text-secondary)]">
        <p>Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-card-bg max-sm:mb-14 h-screen">

      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-[var(--border)] flex items-center gap-5">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden p-1 -ml-1"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}
        <img
          src={activeUser.avatar}
          alt={activeUser.name}
          className="size-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-bold text-sm sm:text-base">{activeUser.name}</h2>
          <span className="text-xs text-[var(--success)] flex items-center gap-1">
            <span className="w-2 h-2 bg-[var(--success)] rounded-full" />
            Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg)]">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] p-3 rounded-2xl text-sm sm:text-base ${
                  isMe
                    ? "bg-active text-white rounded-br-none"
                    : "bg-[var(--card-bg)] text-white rounded-bl-none border border-[var(--border)]"
                }`}
              >
                <p className="text-stone-50">{msg.text}</p>
                <span
                  className={`text-[10px] block text-right mt-1 ${
                    isMe ? "text-white/70" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {formatMessageTime(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-card-bg border-t border-[var(--border)]">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-[var(--bg)] border-none text-sm rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2 focus:ring-0"
          />
          <button
            onClick={handleSend}
            className="bg-[var(--primary)] text-white p-2 rounded-xl hover:bg-opacity-90 active:scale-95 transition-transform" >
            <Send className="size-5 sm:size-6" />
          </button>
        </div>
      </div>

    </div>
  );
};