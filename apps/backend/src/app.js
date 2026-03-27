const express = require("express");
const cors = require("cors");
const session = require("express-session");

const { CORS_ORIGIN, SESSION_COOKIE_NAME, SESSION_SECRET } = require("./config/env");
const passport = require("./config/passport");
const routes = require("./routes");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    name: SESSION_COOKIE_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
