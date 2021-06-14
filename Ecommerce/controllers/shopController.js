const Product = require("../models/product");

exports.getHome = (req, res) => {
  // Check of user is ingelogd
  if (req.session.isLoggedIn) {
    res.status(200).render("shop/index", {
      pageTitle: "Home",
      path: "/",
      login: true,
    });
  } else {
    res.status(200).render("shop/index", {
      pageTitle: "Home",
      path: "/",
      login: false,
    });
  }
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

exports.getProfiel = (req, res) => {
  res.status(200).render("shop/profiel", {
    pageTitle: "Profiel",
    path: "/profiel",
    user: req.user,
  });
};

exports.getProductSpecificatie = (req, res) => {
  res.status(200).render("shop/productSpecs", {
    pageTitle: "Product Specificatie",
    path: "/productSpecificatie",
  });
};

exports.getOorbellen = (req, res) => {
  Product.find({ ProductCategorie: "oorbellen" })
    .then((products) => {
      res.status(200).render("shop/oorbellen", {
        prods: products,
        pageTitle: "Oorbellen",
        path: "/oorbellen",
      });
    })
    .catch((err) => console.log(err));
};

exports.getArmbanden = (req, res) => {
  Product.find({ ProductCategorie: "armbanden" })
    .then((products) => {
      res.status(200).render("shop/armbanden", {
        prods: products,
        pageTitle: "Armbanden",
        path: "/armbanden",
      });
    })
    .catch((err) => console.log(err));
};

exports.getTassen = (req, res) => {
  Product.find({ ProductCategorie: "tassen" })
    .then((products) => {
      res.status(200).render("shop/tassen", {
        prods: products,
        pageTitle: "Tassen",
        path: "/tassen",
      });
    })
    .catch((err) => console.log(err));
};

exports.getWaxmelts = (req, res) => {
  Product.find({ ProductCategorie: "waxmelts" })
    .then((products) => {
      res.status(200).render("shop/waxmelts", {
        prods: products,
        pageTitle: "Waxmelts",
        path: "/waxmelts",
      });
    })
    .catch((err) => console.log(err));
};

exports.getBabyAccessoires = (req, res) => {
  Product.find({ ProductCategorie: "babyaccessoires" })
    .then((products) => {
      res.status(200).render("shop/babyaccessoires", {
        prods: products,
        pageTitle: "Baby Accessoires",
        path: "/babyaccessoires",
      });
    })
    .catch((err) => console.log(err));
};
