let messages = [
  {
    id: "msg-1",
    senderId: "user-1",
    receiverId: "user-2",
    text: "Hi, I am interested in your Web Design task. Can we discuss the details?",
    createdAt: "2024-12-01T10:30:00.000Z",
    isRead: false,
  },
  {
    id: "msg-2",
    senderId: "user-2",
    receiverId: "user-1",
    text: "Sure, send me your portfolio and I will take a look.",
    createdAt: "2024-12-01T11:00:00.000Z",
    isRead: true,
  },
  {
    id: "msg-3",
    senderId: "user-3",
    receiverId: "user-4",
    text: "Thanks for the update. I will finish the API part today.",
    createdAt: "2024-12-02T09:15:00.000Z",
    isRead: false,
  },
];

const getAllMessages = () => messages;

module.exports = {
  getAllMessages,
};
