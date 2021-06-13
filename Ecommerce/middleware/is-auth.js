exports.isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};

exports.isNotAuth = (req, res, next) => {
  // Check of de persoon een admin is.
  if (req.user) {
    if (!req.session.user.admin) {
      return res.redirect("/");
    }
  }
  return res.redirect("/login");
};

exports.isAdmin = (req, res, next) => {
  // Check om op de admin dash te komen.
  if (req.session.isLoggedIn) {
    if (!req.session.user.admin) return res.redirect("/profiel");
    if (req.session.user.admin) return res.redirect("/admin");
  }

  next();
};
