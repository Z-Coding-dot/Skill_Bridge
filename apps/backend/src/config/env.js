require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  SESSION_SECRET: process.env.SESSION_SECRET || "dev-session-secret-change-me",
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME || "skillbridge.sid",
};
