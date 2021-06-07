exports.getHome = (req, res) => {
  res.status(200).render("shop/index", {
    pageTitle: "Home",
    path: "/",
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
    pageTitle: "Oorbellen",
    path: "/oorbellen",
  });
};

exports.getProfiel = (req, res) => {
  res.status(200).render("shop/profiel", {
    pageTitle: "Profiel",
    path: "/profiel",
  });
};
