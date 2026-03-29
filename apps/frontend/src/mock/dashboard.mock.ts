import type { Application } from "@/schemas/application.schema";
import type { MessageType, ChatUser } from "@/schemas/message.schema";
import type { Notification } from "@/schemas/notification.schema";
import type { Task } from "@/schemas/task.schema";

export const dashboardMock = {
  stats: {
    tasksPosted: 3,
    applicationsSent: 4,
    accepted: 1,
  },
  recentActivity: [
    {
      id: "1",
      type: "success",
      text: "New application received",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "warning",
      text: "Your application warning message",
      time: "1 day ago",
    },
  ],
};

export const tasksMock: Task[]= [
  {
    id: "task-1",
    title: "Web Design for Student Portfolio",
    description:"I am looking for a talented web designer to create a portfolio website for me. The website should be modern, responsive, and showcase my projects and skills effectively. I have a clear vision of the design and can provide examples of websites I like.",
    category: "Project",
    deadline: "2026-12-31",
    postedBy: {
      id: "user-1",
      name: "Parsa",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  status: "Open",
  createdAt: "2026-12-01",
},

];


export const conversationsMock: ChatUser[] = [
  {
    id: "u2",
    name: "Mustafa",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    lastMessage: "Hey, can you send the files?",
    lastMessageTime: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: "u3",
    name: "Parsa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    lastMessage: "Thanks for the update!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
];

export const mockMessagesByUser: Record<string, MessageType[]> = {
  u2: [
    {
      id: "msg-1",
      senderId: "u2",
      receiverId: "user-1",
      text: "Hi, I am interested in your Web Design task. Can we discuss the details?",
      timestamp: "10:28 AM",
      createdAt: "2024-12-01T10:28:00Z",
      isRead: true,
    },
    {
      id: "msg-2",
      senderId: "user-1",
      receiverId: "u2",
      text: "Sure! I'd love to hear more about what you need.",
      timestamp: "10:29 AM",
      createdAt: "2024-12-01T10:29:00Z",
      isRead: true,
    },
    {
      id: "msg-3",
      senderId: "u2",
      receiverId: "user-1",
      text: "Hey, can you send the files?",
      timestamp: "10:30 AM",
      createdAt: "2024-12-01T10:30:00Z",
      isRead: false,
    },
  ],
  u3: [
    {
      id: "msg-4",
      senderId: "user-1",
      receiverId: "u3",
      text: "Just pushed the latest changes to the repo.",
      timestamp: "Yesterday",
      createdAt: "2024-11-30T15:00:00Z",
      isRead: true,
    },
    {
      id: "msg-5",
      senderId: "u3",
      receiverId: "user-1",
      text: "Thanks for the update!",
      timestamp: "Yesterday",
      createdAt: "2024-11-30T15:05:00Z",
      isRead: true,
    },
  ],
};

export const profileMock = {
  name: "Parsa",
  email: "parsa@example.com",
  bio: "Computer Science student passionate about frontend development and UI design.",
  skills: [
    { id: "react", label: "React" },
    { id: "typescript", label: "TypeScript" },
    { id: "tailwind", label: "Tailwind CSS" },
    { id: "node", label: "Node.js" },
  ],
};

export const notificationsMock: Notification[]= [
  {
    id: "notif-1",
    type: "info",
    title: "New application received for Web Design Project",
    createdAt:"2025-12-01",
    message: "please review your application. and do successfully "
  },
  {
    id: "notif-2",
    type: "warning",
    title: "Application accepted for React Intern position",
    createdAt: '2026-12-01',
    message: "please review your application. and do successfully please review your application. and do successfully "
  },
  {
    id: "notif-2",
    type: "error",
    title: "Application accepted for React Intern position",
    createdAt: '2026-12-01',
    message: "please review your application. and do successfully please review your application. and do successfully "
  },
  {
    id: "notif-2",
    type: "success",
    title: "Application accepted for React Intern position",
    createdAt: '2026-12-01',
    message: "please review your application. and do successfully please review your application. iew your application. and do successfully please review your application. iew your application. and do successfully please review your application. iew your application. and do successfully please review your application. iew your application. and do successfully please review your application. and do successfully "
  },
];

export const applicationsMock: Application[]= [
  {
    id: "app-1",
    taskTitle: "Web Design for Student Portfolio",
    status: "rejected",
    pitch: "I have 3 years of experience in web design and have created multiple portfolio websites. I can deliver a modern, responsive design that perfectly showcases your work."
  }
];

