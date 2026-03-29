const optionalAuth = (req, res, next) => {
  next();
};

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "authentication required" });
  }

  next();
};

module.exports = {
  optionalAuth,
  requireAuth,
};