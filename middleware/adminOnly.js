function adminOnly(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  req.flash("error_msg", "Acesso negado. Admins apenas.");
  res.redirect("/auth/login");
}

module.exports = { adminOnly };
