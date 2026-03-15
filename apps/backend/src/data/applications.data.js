let applications = [
  {
    id: "app-1",
    taskTitle: "Design a landing page for SkillBridge",
    status: "pending",
    pitch: "I can create a clean and responsive landing page UI.",
  },
  {
    id: "app-2",
    taskTitle: "Build REST API for profile module",
    status: "accepted",
    pitch: "I already started working with Express and can finish this fast.",
  },
  {
    id: "app-3",
    taskTitle: "Write project presentation content",
    status: "rejected",
    pitch:
      "I have experience preparing presentation content for student projects.",
  },
];

const getAllApplications = () => applications;

const createApplication = ({ taskTitle, pitch }) => {
  const newApplication = {
    id: `app-${Date.now()}`,
    taskTitle,
    status: "pending",
    pitch,
  };

  applications.unshift(newApplication);

  return newApplication;
};

module.exports = {
  getAllApplications,
  createApplication,
};
