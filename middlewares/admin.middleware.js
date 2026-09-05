function adminMiddleware(req, res, next) {
  
  if (!req.user) {
    return res.redirect("/auth");
  }

  if (req.user.role !== "admin") {
    return res.redirect("/dashboard");
  }

  next();
}

module.exports = adminMiddleware;