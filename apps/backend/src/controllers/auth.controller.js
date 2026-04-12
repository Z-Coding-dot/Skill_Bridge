const prisma = require("../lib/prisma");
const passport = require("passport");
const { SESSION_COOKIE_NAME } = require("../config/env");
const { hashPassword } = require("../lib/password");

const mapAuthUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
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

    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.status(201).json({
        message: "account created successfully",
        user: mapAuthUser(user),
      });
    });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || "invalid email or password",
      });
    }

    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.status(200).json({
        message: "login successful",
        user: mapAuthUser(user),
      });
    });
  })(req, res, next);
};

const me = (req, res) => {
  res.status(200).json({
    user: mapAuthUser(req.user),
  });
};

const logout = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie(SESSION_COOKIE_NAME);
      return res.status(200).json({ message: "logout successful" });
    });
  });
};

module.exports = {
  signup,
  login,
  me,
  logout,
};
