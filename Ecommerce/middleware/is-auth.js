exports.isAuth = (req, res, next) => {
  // Als user al is ingelogd (login poppetje etc)
  if (req.session.isLoggedIn) {
    // Check of die admin is zoja stuur hem naar admin profiel anders normaal.
    console.log("U bent al ingelogd");
    return res.redirect("/profiel");
  }
  next();
};

exports.isNotAuth = (req, res, next) => {
  // Als user moet inloggen voor een specifieke actie
  if (!req.session.isLoggedIn) {
    console.log("U bent niet ingelogd");
    return res.redirect("/login");
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  // Check of user is ingelogd
  if (req.session.isLoggedIn) {
    // Check of ingelogde user een admin is.
    if (!req.session.user.admin) {
      return res.redirect("/bestellingen");
    }
    return res.redirect("/profiel");
  }

  next();
};
