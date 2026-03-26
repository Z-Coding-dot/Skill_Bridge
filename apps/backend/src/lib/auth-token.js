const crypto = require("crypto");

const { AUTH_SECRET, AUTH_COOKIE_NAME } = require("../config/env");

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

const encode = (value) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const decode = (value) =>
  JSON.parse(Buffer.from(value, "base64url").toString("utf8"));

const sign = (value) =>
  crypto.createHmac("sha256", AUTH_SECRET).update(value).digest("base64url");

const createAuthToken = (userId) => {
  const header = encode({ alg: "HS256", typ: "JWT" });
  const payload = encode({
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  });
  const signature = sign(`${header}.${payload}`);

  return `${header}.${payload}.${signature}`;
};

const verifyAuthToken = (token) => {
  if (typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [header, payload, signature] = parts;
  const expectedSignature = sign(`${header}.${payload}`);

  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (
    actual.length !== expected.length ||
    !crypto.timingSafeEqual(actual, expected)
  ) {
    return null;
  }

  const decodedPayload = decode(payload);

  if (
    !decodedPayload ||
    typeof decodedPayload.sub !== "string" ||
    typeof decodedPayload.exp !== "number" ||
    decodedPayload.exp < Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  return decodedPayload;
};

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: TOKEN_TTL_SECONDS * 1000,
  path: "/",
};

const setAuthCookie = (res, userId) => {
  res.cookie(AUTH_COOKIE_NAME, createAuthToken(userId), cookieOptions);
};

const clearAuthCookie = (res) => {
  res.clearCookie(AUTH_COOKIE_NAME, cookieOptions);
};

module.exports = {
  AUTH_COOKIE_NAME,
  createAuthToken,
  verifyAuthToken,
  setAuthCookie,
  clearAuthCookie,
};
