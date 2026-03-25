const prisma = require("../lib/prisma");
const { hashPassword, verifyPassword } = require("../lib/password");

const mapAuthUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
});

const signup = async (req, res, next) => {
  try {
    const { name, email, bio, skills, password } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const normalizedBio = typeof bio === "string" ? bio.trim() : "";
    const normalizedPassword = typeof password === "string" ? password : "";
    const normalizedSkills = Array.isArray(skills)
      ? skills
          .map((skill) =>
            typeof skill?.value === "string" ? skill.value.trim() : "",
          )
          .filter(Boolean)
      : [];

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({ message: "email already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash: await hashPassword(normalizedPassword),
        profile: {
          create: {
            bio: normalizedBio,
          },
        },
        skills: {
          create: normalizedSkills.map((label) => ({
            skill: {
              connectOrCreate: {
                where: { label },
                create: { label },
              },
            },
          })),
        },
      },
    });

    res.status(201).json({
      message: "account created successfully",
      user: mapAuthUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const normalizedPassword = typeof password === "string" ? password : "";

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (
      !user ||
      !(await verifyPassword(normalizedPassword, user.passwordHash))
    ) {
      return res.status(401).json({
        message: "invalid email or password",
      });
    }

    res.status(200).json({
      message: "login successful",
      user: mapAuthUser(user),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
