import type { ChatUser } from "@/schemas/message.schema";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Message } from "yup";

type ChatWindowProps = {
  activeUser: ChatUser | null;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
};

export const ChatWindow = ({ activeUser, messages, currentUserId, onSendMessage }: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div className="flex-1 flex flex-col bg-card-bg h-full">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
        <img
          src={activeUser.avatar}
          alt={activeUser.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-bold">{activeUser.name}</h2>
          <span className="text-xs text-[var(--success)] flex items-center gap-1">
            <span className="w-2 h-2 bg-[var(--success)] rounded-full"></span>
            Online
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg)]">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                  isMe
                    ? "bg-[var(--primary)] text-white rounded-br-none"
                    : "bg-[var(--card-bg)] text-[var(--text-primary)] rounded-bl-none border border-[var(--border)]"
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[10px] block text-right mt-1 ${
                    isMe ? "text-white/70" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card-bg border-t border-[var(--border)]">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-[var(--bg)] border-none rounded-full px-4 py-2 focus:ring-1 focus:ring-[var(--primary)]"
          />
          <button
            onClick={handleSend}
            className="bg-[var(--primary)] text-white p-2 rounded-full hover:bg-opacity-90 active:scale-95 transition-transform"
          >
            <Send className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
