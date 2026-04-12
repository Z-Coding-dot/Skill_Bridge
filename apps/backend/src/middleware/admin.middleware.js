const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "unauthorized" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "forbidden" });
  next();
};

module.exports = { requireAdmin };