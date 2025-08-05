function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  req.flash("error_msg", "Por favor faça login para acessar essa página");
  res.redirect("/auth/login");
}

module.exports = { ensureAuthenticated };
