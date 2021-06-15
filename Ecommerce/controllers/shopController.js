const Product = require("../models/product");

// Method die home pagina laad met benodigde variabelen/ ook checkt die of de user is ingelogd.
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

// Method die de bestellingen pagina regelt binnen in de user profiel.
exports.getBestellingen = (req, res) => {
  res.status(200).render("shop/bestellingen", {
    pageTitle: "Bestellingen",
    path: "/bestellingen",
  });
};

// Method die de winkelmand laad met alle informatie binnen in de database.
exports.getWinkeland = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      res.status(200).render("shop/winkelmand", {
        pageTitle: "Winkelmand",
        path: "/winkelmand",
        prods: products,
      });
    });
};

// Method die profiel laad binnen in het user profiel.
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
        pageTitle: "Wax Melts",
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

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/productSpecs", {
        prods: product,
        pageTitle: "Product Specificatie",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getRetourneren = (req, res) => {
  res.status(200).render("footer/retourneren", {
    pageTitle: "Retourneren",
    path: "/retourneren",
    user: req.user,
  });
}

exports.getInspiratie = (req, res) => {
  res.status(200).render("footer/inspiratie", {
    pageTitle: "Inspiratie",
    path: "/inspiratie",
    user: req.user,
  });
}

exports.getContact = (req, res) => {
  res.status(200).render("footer/contact", {
    pageTitle: "Contact",
    path: "/contact",
    user: req.user,
  });
}

exports.postWinkelmand = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/winkelmand");
    });
};

exports.postWinkelmandDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user.removeFromCart(prodId).then((result) => {
    res.redirect("/winkelmand");
  });
};
