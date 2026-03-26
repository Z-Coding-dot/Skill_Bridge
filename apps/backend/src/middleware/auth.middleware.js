const prisma = require("../lib/prisma");
const {
  AUTH_COOKIE_NAME,
  verifyAuthToken,
} = require("../lib/auth-token");

const parseCookies = (headerValue = "") =>
  headerValue
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, entry) => {
      const separatorIndex = entry.indexOf("=");

      if (separatorIndex === -1) {
        return cookies;
      }

      const key = entry.slice(0, separatorIndex).trim();
      const value = entry.slice(separatorIndex + 1).trim();

      if (!key) {
        return cookies;
      }

      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});

const loadAuthenticatedUser = async (req) => {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[AUTH_COOKIE_NAME];
  const payload = verifyAuthToken(token);

  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return user;
};

const optionalAuth = async (req, res, next) => {
  try {
    req.user = await loadAuthenticatedUser(req);
    next();
  } catch (error) {
    next(error);
  }
};

const requireAuth = async (req, res, next) => {
  try {
    req.user = await loadAuthenticatedUser(req);

    if (!req.user) {
      return res.status(401).json({ message: "authentication required" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  optionalAuth,
  requireAuth,
};
