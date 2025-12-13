
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

export const tasksMock = [
  {
    id: "task-1",
    title: "Web Design for Student Portfolio",
    description:"I need a good",
    category: "Project",
    deadline: "2024-12-31T23:59:59Z",
    type: "Project",
    postedBy: {
      id: "user-1",
      name: "Parsa",
  },
  status: "Open",
  createdAt: "2024-12-01T10:30:00Z",
},

];

export const messagesMock = [
  {
    id: "msg-1",
    sender: "Ali Khan",
    text: "Hi, I am interested in your Web Design task. Can we discuss the details?",
    createdAt: "2024-12-01T10:30:00Z",
  },
  {
    id: "msg-2",
    sender: "Sarah Lee",
    text: "I've submitted my application. Looking forward to your response!",
    createdAt: "2024-12-02T14:45:00Z",
  },
  {
    id: "msg-3",
    sender: "John Smith",
    text: "The task deadline works perfectly for me.",
    createdAt: "2024-12-03T09:10:00Z",
  },
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

export const notificationsMock = [
  {
    id: "notif-1",
    type: "info",
    text: "New application received for Web Design Project",
    time: "3 hours ago",
  },
  {
    id: "notif-2",
    type: "success",
    text: "Application accepted for React Intern position",
    time: "1 day ago",
  },
];

export const applicationsMock = {
    id:"app-1",
    taskTitle: "Web Design for Student Portfolio",
    status: "pending",
    pitch: "I have 3 years of experience in web design and have created multiple portfolio websites. I can deliver a modern, responsive design that perfectly showcases your work."
}

