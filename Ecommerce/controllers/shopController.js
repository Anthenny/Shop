const Product = require("../models/product");
const Order = require("../models/order");

// Method die home pagina laad met benodigde variabelen/ ook checkt die of de user is ingelogd.
exports.getHome = (req, res) => {
  // Check of user is ingelogd
  if (req.session.isLoggedIn) {
    res.status(200).render("shop/index", {
      pageTitle: "Home",
      pageDesc: "Welkom op de homepagina!",
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

// Method die de winkelmand laad met alle informatie binnen in de database.
exports.getWinkeland = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      res.status(200).render("shop/winkelmand", {
        pageTitle: "Winkelmand",
        pageDesc: "Voeg producten toe aan uw winkelmand zodat u deze gemakkelijk kan bestellen.",
        path: "/winkelmand",
        prods: products,
      });
    });
};

// Method die profiel laad binnen in het user profiel.
exports.getProfiel = (req, res) => {
  res.status(200).render("shop/profiel", {
    pageTitle: "Profiel",
    pageDesc: "Bekijk uw profiel.",
    path: "/profiel",
    user: req.user,
  });
};

exports.getProductSpecificatie = (req, res) => {
  res.status(200).render("shop/productSpecs", {
    pageTitle: "Product Specificatie",
    pageDesc: "Bekijk details over uw product.",
    path: "/productSpecificatie",
  });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/productSpecs", {
        prods: product,
        pageTitle: "Product Specificatie",
        pageDesc: "Bekijk details over uw product.",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getRetourneren = (req, res) => {
  res.status(200).render("footer/retourneren", {
    pageTitle: "Retourneren",
    pageDesc: "Bekijk uw opties als het gaat om retourneren.",
    path: "/retourneren",
    user: req.user,
  });
};

exports.getInspiratie = (req, res) => {
  res.status(200).render("footer/inspiratie", {
    pageTitle: "Inspiratie",
    pageDesc: "Bekijk wat Anna's accessoires haar inspiratiebronnen zijn.",
    path: "/inspiratie",
    user: req.user,
  });
};

exports.getContact = (req, res) => {
  res.status(200).render("footer/contact", {
    pageTitle: "Contact",
    pageDesc: "Bekijk hoe je het beste contact kan opnemen.",
    path: "/contact",
    user: req.user,
  });
};

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

exports.postOrder = (req, res, next) => {
  req.user
    // kijk wat dat precies doet en waarom
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      // je gaat door elke item in winkelmand
      // en je pakt de hoeveel heid (quantity)
      // en de helle product (moet nog kijken hoe en waarom)
      const products = user.cart.items.map((i) => {
        return {
          quantity: i.quantity,
          product: { ...i.productId._doc },
        };
      });
      // dan je maakt nieuw order met de name en id van user
      // en de producten die user besteelt heeft
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
        status: false,
      });
      // je zet het in order model
      return order.save();
    })
    // als dat alles gedaan is verwijder je de product uit winkelmand
    // met clearCart functie die je in user.model hebt gemaakt
    .then((result) => {
      return req.user.clearCart();
    })
    // na dat alles klaar is en die winkelmand leeg is stuur je hem naar ...
    .then(() => {
      res.redirect("/succesPage");
    })
    .catch((err) => console.log(err));
};

exports.getSuccesPage = (req, res) => {
  res.status(200).render("shop/succesPage", {
    pageTitle: "Succes",
    pageDesc: "Bedankt voor de bestelling we gaan zo snel mogelijk aan de slag!",
    path: "/succesPage",
  });
};

exports.getKlantBestelingen = (req, res) => {
  const klant = req.user.name;
  Order.find({ "user.name": klant })
    .then((orders) => {
      res.status(200).render("shop/bestellingen", {
        path: "/bestellingen",
        pageTitle: "Bestellingen",
        pageDesc: "Zie hier al uw bestellingen.",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
