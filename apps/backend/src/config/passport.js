const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const prisma = require("../lib/prisma");
const { verifyPassword } = require("../lib/password");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const normalizedEmail =
          typeof email === "string" ? email.trim().toLowerCase() : "";
        const normalizedPassword =
          typeof password === "string" ? password : "";

        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (
          !user ||
          !(await verifyPassword(normalizedPassword, user.passwordHash))
        ) {
          return done(null, false, {
            message: "invalid email or password",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    done(null, user || false);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
