const prisma = require("../lib/prisma");

const mapProfile = (user) => ({
  name: user.name,
  email: user.email,
  bio: user.profile?.bio ?? "",
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
        include: {
          skill: true,
        },
        orderBy: {
          skill: {
            label: "asc",
          },
        },
      },
    },
  });

const getProfile = async (req, res, next) => {
  try {
    const user = await loadProfileUser(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "profile not found" });
    }

    res.status(200).json(mapProfile(user));
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
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
          typeof skill.label !== "string"
        ) {
          return res.status(400).json({
            message: "each skill must include a string label",
          });
        }
      }
    }

    const normalizedName =
      typeof name === "string" ? name.trim() : undefined;
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : undefined;
    const normalizedBio = typeof bio === "string" ? bio.trim() : undefined;
    const normalizedSkills =
      skills === undefined
        ? undefined
        : skills
            .map((skill) => skill.label.trim())
            .filter(Boolean)
            .map((label) => ({ label }));

    if (normalizedName !== undefined && !normalizedName) {
      return res.status(400).json({ message: "name cannot be empty" });
    }

    if (normalizedEmail !== undefined && !normalizedEmail) {
      return res.status(400).json({ message: "email cannot be empty" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(normalizedName !== undefined ? { name: normalizedName } : {}),
        ...(normalizedEmail !== undefined ? { email: normalizedEmail } : {}),
        ...(normalizedBio !== undefined
          ? {
              profile: {
                upsert: {
                  create: { bio: normalizedBio },
                  update: { bio: normalizedBio },
                },
              },
            }
          : {}),
        ...(normalizedSkills !== undefined
          ? {
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
            }
          : {}),
      },
      include: {
        profile: true,
        skills: {
          include: {
            skill: true,
          },
          orderBy: {
            skill: {
              label: "asc",
            },
          },
        },
      },
    });

    res.status(200).json(mapProfile(updatedUser));
  } catch (error) {
    if (error?.code === "P2002") {
      return res.status(409).json({ message: "email already exists" });
    }

    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
