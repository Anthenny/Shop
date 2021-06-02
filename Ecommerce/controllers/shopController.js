exports.getHome = (req, res) => {
  res.status(200).render("shop/index", {
    pageTitle: "Home",
    path: "/",
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render("shop/login", {
    pageTitle: "Login",
    path: "/login",
  });
};

exports.getSignUp = (req, res) => {
  res.status(200).render("shop/signUp", {
    pageTitle: "Sign Up",
    path: "/signUp",
  });
};

exports.getBestellingen = (req, res) => {
  res.status(200).render("shop/bestellingen", {
    pageTitle: "Bestellingen",
    path: "/bestellingen",
  });
};

exports.getWinkeland = (req, res) => {
  res.status(200).render("shop/winkelmand", {
    pageTitle: "Winkelmand",
    path: "/winkelmand",
  });
};

exports.getOorbellen = (req, res) => {
  res.status(200).render("shop/oorbellen", {
    pageTitle: "Winkelmand",
    path: "/winkelmand",
  });
};
