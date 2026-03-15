let profile = {
  name: "Test Student",
  email: "test@example.com",
  bio: "Computer science student building SkillBridge backend.",
  skills: [
    { id: "1", label: "JavaScript" },
    { id: "2", label: "Express" },
  ],
};

const getProfileData = () => profile;

const updateProfileData = (updates) => {
  profile = {
    ...profile,
    ...updates,
    skills: Array.isArray(updates.skills) ? updates.skills : profile.skills,
  };

  return profile;
};

module.exports = {
  getProfileData,
  updateProfileData,
};
