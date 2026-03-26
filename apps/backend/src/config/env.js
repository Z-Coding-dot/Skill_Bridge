require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  AUTH_SECRET: process.env.AUTH_SECRET || "dev-auth-secret-change-me",
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || "skillbridge_auth",
};
