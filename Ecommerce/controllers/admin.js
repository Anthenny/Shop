// File waar alle methods van admin te vinden zijn.

const Product = require("../models/product");
const Order = require("../models/order");
// Laad alle producten uit de database.
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/admin", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin",
      });
    })
    .catch((err) => console.log(err));
};

// Laad de pagina met de inputvelden waar de admin producten kan toevoegen.
exports.getAddProduct = (req, res, next) => {
  res.render("admin/Add-Edit-product", {
    pageTitle: "Product toevoegen",
    path: "/add-product",
    editing: false,
  });
};

// Post de gegevens die ingevuld zijn en maak een nieuw product aan.
exports.postAddproduct = (req, res, next) => {
  const productNaam = req.body.productNaam;
  const productImg = req.body.productImg;
  const productBeschrijving = req.body.productBeschrijving;
  const productPrijs = req.body.productPrijs;
  const productCategorie = req.body.productCategorie;
  const productMaat = req.body.productMaat;
  const productKleur = req.body.productKleur;
  const product = new Product({
    productNaam: productNaam,
    productImg: `../img/Producten/${productImg}`,
    productBeschrijving: productBeschrijving,
    productPrijs: productPrijs,
    productCategorie: productCategorie,
    productMaat: productMaat,
    productKleur: productKleur,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Laad het specifieke product.
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/Add-Edit-product", {
        pageTitle: "Edit Product",
        pageDesc: "Een admin pagina waar we producten kunnen editen",
        path: "/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

// Update het geselecteerde product.
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedProductNaam = req.body.productNaam;
  const updatedProductImg = req.body.productImg;
  const updatedProductBeschrijving = req.body.productBeschrijving;
  const updatedProductPrijs = req.body.productPrijs;
  const updatedProductCategorie = req.body.productCategorie;
  const updatedProductMaat = req.body.productMaat;
  const updatedProductKleur = req.body.productKleur;

  Product.findById(prodId)
    .then((product) => {
      product.productNaam = updatedProductNaam;
      product.productPrijs = updatedProductPrijs;
      product.productBeschrijving = updatedProductBeschrijving;
      product.productImg = `../img/Producten/${updatedProductImg}`;
      product.productCategorie = updatedProductCategorie;
      product.productMaat = updatedProductMaat;
      product.productKleur = updatedProductKleur;
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => console.log(err));
};

// Verwijder het specifieke product(via id)
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.redirect("admin");
    })
    .catch((err) => console.log(err));
};

exports.getNewOrders = (req, res, next) => {
  Order.find({ status: false })
    .then((orders) => {
      res.render("admin/order", {
        path: "/orders",
        pageTitle: "Your Orders",
        pageDesc: "Een admin pagina waar we nieuwe bestellingen kunnen zien",

        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getOldOrders = (req, res, next) => {
  Order.find({ status: true })
    .then((orders) => {
      res.render("admin/oldOrders", {
        path: "/oldOrders",
        pageTitle: "Your Orders",
        pageDesc: "Een admin pagina waar we oude bestellingen kunnen zien",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAfhandelen = (req, res) => {
  const orderId = req.body.orderId;
  Order.findByIdAndUpdate(orderId)
    .then((Order) => {
      Order.status = true;
      return Order.save();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.postOnGedaanMaken = (req, res) => {
  const orderId = req.body.orderId;
  Order.findByIdAndUpdate(orderId)
    .then((Order) => {
      Order.status = false;
      return Order.save();
    })
    .then(() => {
      res.redirect("/oldOrders");
    })
    .catch((err) => console.log(err));
};

exports.postDeletOder = (req, res) => {
  const orderId = req.body.orderId;
  Order.findByIdAndRemove(orderId)
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
