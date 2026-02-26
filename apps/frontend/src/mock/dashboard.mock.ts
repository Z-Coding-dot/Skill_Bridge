import type { Application } from "@/schemas/application.schema";
import type {Message } from "@/schemas/message.schema";
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
    description:"I need a good",
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

export const messagesMock: Message[]= [
  {
    id: "msg-1",
    senderId: "Ali Khan",
    receiverId: "Sarah Lee",
    text: "Hi, I am interested in your Web Design task. Can we discuss the details?",
    createdAt: "2024-12-01T10:30:00Z",
    isRead: false,
  },
];
export const conversationsMock = [
    { 
        id: "u2", 
        name: "Sarah Johnson", 
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", 
        lastMessage: "Hey, can you send the files?", 
        lastMessageTime: "10:30 AM",
        unreadCount: 2
      },
      { 
        id: "u3", 
        name: "David Chen", 
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", 
        lastMessage: "Thanks for the update!", 
        lastMessageTime: "Yesterday",
        unreadCount: 0
      }
];

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
    status: "pending",
    pitch: "I have 3 years of experience in web design and have created multiple portfolio websites. I can deliver a modern, responsive design that perfectly showcases your work."
  }
];

