let tasks = [
  {
    id: "1",
    title: "Design a landing page for SkillBridge",
    description: "Create a responsive landing page UI for the platform.",
    category: "Project",
    deadline: "2026-03-25T23:59:59.000Z",
    postedBy: {
      id: "u1",
      name: "Aigerim",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    status: "Open",
    createdAt: "2026-03-10T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Build REST API for profile module",
    description: "Implement backend endpoints for profile viewing and editing.",
    category: "Gig",
    deadline: "2026-03-22T23:59:59.000Z",
    postedBy: {
      id: "u2",
      name: "Nursultan",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    status: "Closed",
    createdAt: "2026-03-09T14:30:00.000Z",
  },
  {
    id: "3",
    title: "Write project presentation content",
    description: "Prepare the content for the final project pitch deck.",
    category: "Freelance",
    deadline: "2026-03-28T23:59:59.000Z",
    postedBy: {
      id: "u3",
      name: "Madina",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    status: "Open",
    createdAt: "2026-03-11T08:15:00.000Z",
  },
];

const getAllTasks = (filters = {}) => {
  let result = [...tasks];

  if (filters.status) {
    result = result.filter(
      (task) => task.status.toLowerCase() === filters.status.toLowerCase(),
    );
  }

  if (filters.category) {
    result = result.filter(
      (task) => task.category.toLowerCase() === filters.category.toLowerCase(),
    );
  }

  return result;
};

const getTaskById = (id) => {
  return tasks.find((task) => task.id === id);
};

const createTask = ({
  title,
  description,
  category,
  deadline,
  postedBy,
  status = "Open",
}) => {
  const newTask = {
    id: String(Date.now()),
    title,
    description,
    category,
    deadline,
    postedBy,
    status,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(newTask);

  return newTask;
};

const updateTaskById = (id, updates) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updates,
    postedBy: updates.postedBy
      ? {
          ...tasks[taskIndex].postedBy,
          ...updates.postedBy,
        }
      : tasks[taskIndex].postedBy,
  };

  return tasks[taskIndex];
};

const deleteTaskById = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);
  return deletedTask;
};

const getTasksCount = () => tasks.length;

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  getTasksCount,
};
