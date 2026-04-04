const prisma = require("../lib/prisma");

const mapMessage = (message) => ({
  id: message.id,
  senderId: message.senderId,
  receiverId: message.receiverId,
  text: message.text,
  createdAt: message.createdAt.toISOString(),
  isRead: message.isRead,
});

const mapConversation = (message, currentUserId) => {
  const otherUser =
    message.senderId === currentUserId ? message.receiver : message.sender;

  return {
    id: otherUser.id,
    name: otherUser.name,
    avatar: otherUser.avatarUrl ?? undefined,
    lastMessage: message.text,
    lastMessageAt: message.createdAt.toISOString(),
    unreadCount: 0,
  };
};

const getConversations = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: currentUserId }, { receiverId: currentUserId }],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const unreadCounts = await prisma.message.groupBy({
      by: ["senderId"],
      where: {
        receiverId: currentUserId,
        isRead: false,
      },
      _count: {
        senderId: true,
      },
    });

    const unreadCountBySender = new Map(
      unreadCounts.map((item) => [item.senderId, item._count.senderId]),
    );
    const conversationsByUserId = new Map();

    for (const message of messages) {
      const otherUserId =
        message.senderId === currentUserId ? message.receiverId : message.senderId;

      if (!conversationsByUserId.has(otherUserId)) {
        conversationsByUserId.set(otherUserId, {
          ...mapConversation(message, currentUserId),
          unreadCount: unreadCountBySender.get(otherUserId) ?? 0,
        });
      }
    }

    res.status(200).json([...conversationsByUserId.values()]);
  } catch (error) {
    next(error);
  }
};

const getConversationMessages = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const { userId } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: currentUserId,
            receiverId: userId,
          },
          {
            senderId: userId,
            receiverId: currentUserId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json(messages.map(mapMessage));
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const receiverId =
      typeof req.body.receiverId === "string" ? req.body.receiverId.trim() : "";
    const text = typeof req.body.text === "string" ? req.body.text.trim() : "";

    if (!receiverId) {
      return res.status(400).json({ message: "receiverId is required" });
    }

    if (!text) {
      return res.status(400).json({ message: "text is required" });
    }

    if (receiverId === senderId) {
      return res.status(400).json({ message: "cannot send a message to yourself" });
    }

    const receiver = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
      select: {
        id: true,
      },
    });

    if (!receiver) {
      return res.status(404).json({ message: "receiver not found" });
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        text,
      },
    });

    res.status(201).json(mapMessage(message));
  } catch (error) {
    next(error);
  }
};

const markConversationAsRead = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const { userId } = req.params;

    await prisma.message.updateMany({
      where: {
        senderId: userId,
        receiverId: currentUserId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  getConversationMessages,
  createMessage,
  markConversationAsRead,
};
