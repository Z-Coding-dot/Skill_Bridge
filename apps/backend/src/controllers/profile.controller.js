const prisma = require("../lib/prisma");
const { upload } = require("../config/cloudinary");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/avatars/",
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const BASE_URL = "";

const mapProfile = (user) => ({
  name: user.name,
  email: user.email,
  bio: user.profile?.bio ?? "",
  // avatar: user.profile?.avatar ? `${BASE_URL}${user.profile.avatar}` : null,
  avatar: user.profile?.avatar ?? null,
  skills: user.skills.map(({ skill }) => ({
    id: skill.id,
    label: skill.label,
  })),
});

const loadProfileUser = async (userId) =>
  prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      skills: {
        include: { skill: true },
        orderBy: { skill: { label: "asc" } },
      },
    },
  });

const getProfile = async (req, res, next) => {
  try {
    const user = await loadProfileUser(req.user.id);
    if (!user) return res.status(404).json({ message: "profile not found" });
    res.status(200).json(mapProfile(user));
  } catch (error) {
    next(error);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        skills: {
          include: { skill: true },
          orderBy: { skill: { label: "asc" } },
        },
      },
    });

    if (!user) return res.status(404).json({ message: "profile not found" });
    res.status(200).json(mapProfile(user));
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    let skills;
    if (req.body.skills) {
      try {
        skills = JSON.parse(req.body.skills);
      } catch {
        skills = req.body.skills;
      }
    }

    // const avatarPath = req.file ? `/uploads/avatars/${req.file.filename}` : undefined;
    const avatarPath = req.file ? req.file.path : undefined;

    if (name !== undefined && typeof name !== "string")
      return res.status(400).json({ message: "name must be a string" });
    if (email !== undefined && typeof email !== "string")
      return res.status(400).json({ message: "email must be a string" });
    if (bio !== undefined && typeof bio !== "string")
      return res.status(400).json({ message: "bio must be a string" });

    const normalizedName = typeof name === "string" ? name.trim() : undefined;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : undefined;
    const normalizedBio = typeof bio === "string" ? bio.trim() : undefined;
    const normalizedSkills = skills === undefined
      ? undefined
      : skills.map((s) => s.label.trim()).filter(Boolean).map((label) => ({ label }));

    if (normalizedName !== undefined && !normalizedName)
      return res.status(400).json({ message: "name cannot be empty" });
    if (normalizedEmail !== undefined && !normalizedEmail)
      return res.status(400).json({ message: "email cannot be empty" });

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(normalizedName !== undefined ? { name: normalizedName } : {}),
        ...(normalizedEmail !== undefined ? { email: normalizedEmail } : {}),
        ...(normalizedBio !== undefined || avatarPath !== undefined ? {
          profile: {
            upsert: {
              create: {
                ...(normalizedBio !== undefined ? { bio: normalizedBio } : {}),
                ...(avatarPath !== undefined ? { avatar: avatarPath } : {}),
              },
              update: {
                ...(normalizedBio !== undefined ? { bio: normalizedBio } : {}),
                ...(avatarPath !== undefined ? { avatar: avatarPath } : {}),
              },
            },
          },
        } : {}),
        ...(normalizedSkills !== undefined ? {
          skills: {
            deleteMany: {},
            create: normalizedSkills.map(({ label }) => ({
              skill: {
                connectOrCreate: {
                  where: { label },
                  create: { label },
                },
              },
            })),
          },
        } : {}),
      },
      include: {
        profile: true,
        skills: {
          include: { skill: true },
          orderBy: { skill: { label: "asc" } },
        },
      },
    });

    res.status(200).json(mapProfile(updatedUser));
  } catch (error) {
    if (error?.code === "P2002")
      return res.status(409).json({ message: "email already exists" });
    next(error);
  }
};

module.exports = { getProfile, updateProfile, upload, getProfileById };