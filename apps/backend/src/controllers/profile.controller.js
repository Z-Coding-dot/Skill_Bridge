const { getProfileData, updateProfileData } = require("../data/profile.data");

const getProfile = (req, res) => {
  const profile = getProfileData();
  res.status(200).json(profile);
};

const updateProfile = (req, res, next) => {
  try {
    const { name, email, bio, skills } = req.body;

    if (name !== undefined && typeof name !== "string") {
      return res.status(400).json({ message: "name must be a string" });
    }

    if (email !== undefined && typeof email !== "string") {
      return res.status(400).json({ message: "email must be a string" });
    }

    if (bio !== undefined && typeof bio !== "string") {
      return res.status(400).json({ message: "bio must be a string" });
    }

    if (skills !== undefined) {
      if (!Array.isArray(skills)) {
        return res.status(400).json({ message: "skills must be an array" });
      }

      for (const skill of skills) {
        if (
          typeof skill !== "object" ||
          skill === null ||
          typeof skill.id !== "string" ||
          typeof skill.label !== "string"
        ) {
          return res.status(400).json({
            message: "each skill must have string id and label",
          });
        }
      }
    }

    const updatedProfile = updateProfileData({
      name,
      email,
      bio,
      skills,
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
