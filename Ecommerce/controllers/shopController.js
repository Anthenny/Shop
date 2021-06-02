exports.getHome = (req, res) => {
  res.status(200).render("shop/index", {
    pageTitle: "Home",
    path: "/",
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render("login", {
    pageTitle: "Login",
    path: "/login",
  });
};

exports.getSignUp = (req, res) => {
  res.status(200).render("signUp", {
    pageTitle: "Sign Up",
    path: "/signUp",
  });
};

exports.getBestellingen = (req, res) => {
  res.status(200).render("bestellingen", {
    pageTitle: "Bestellingen",
    path: "/bestellingen",
  });
};

exports.getWinkeland = (req, res) => {
  res.status(200).render("winkelmand", {
    pageTitle: "Winkelmand",
    path: "/winkelmand",
  });
};
