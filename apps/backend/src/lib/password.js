const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const verifyPassword = async (password, passwordHash) => {
  if (!passwordHash || typeof passwordHash !== "string") {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
};

module.exports = {
  hashPassword,
  verifyPassword,
};
