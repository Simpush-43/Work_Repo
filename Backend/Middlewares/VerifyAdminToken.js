export const VerifyAdmintoken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid token format" });
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .send({ message: "Forbidden: Invalid or expired token" });
    req.user = { id: user.id };
    next();
  });
};
