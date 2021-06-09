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

exports.getArmbanden = (req, res) => {
  res.status(200).render("shop/armbanden", {
    pageTitle: "Armbanden",
    path: "/armbanden",
  });
};

exports.getTassen = (req, res) => {
  res.status(200).render("shop/tassen", {
    pageTitle: "Tassen",
    path: "/tassen",
  });
};

exports.getWaxmelts = (req, res) => {
  res.status(200).render("shop/waxmelts", {
    pageTitle: "Waxmelts",
    path: "/waxmelts",
  });
};

exports.getBabyAccessoires = (req, res) => {
  res.status(200).render("shop/babyaccessoires", {
    pageTitle: "Baby Accessoires",
    path: "/babyaccessoires",
  });
};

exports.getProductSpecificatie = (req, res) => {
  res.status(200).render("shop/productSpecs", {
    pageTitle: "Product Specificatie",
    path: "/productSpecificatie",
  });
};
