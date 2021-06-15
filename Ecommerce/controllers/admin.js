// File waar alle methods van admin te vinden zijn.

const Product = require("../models/product");

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
    path: "Add-product",
    editing: false,
  });
};

// Post de gegevens die ingevuld zijn en maak een nieuw product aan.
exports.postAddproduct = (req, res, next) => {
  const ProductNaam = req.body.ProductNaam;
  const ProductImg = req.body.ProductImg;
  const ProductBeschrijving = req.body.ProductBeschrijving;
  const ProductPrijs = req.body.ProductPrijs;
  const ProductCategorie = req.body.ProductCategorie;
  const ProductMaat = req.body.ProductMaat;
  const ProductKleur = req.body.ProductKleur;
  const product = new Product({
    ProductNaam: ProductNaam,
    ProductImg: `../img/Producten/${ProductImg}`,
    ProductBeschrijving: ProductBeschrijving,
    ProductPrijs: ProductPrijs,
    ProductCategorie: ProductCategorie,
    ProductMaat: ProductMaat,
    ProductKleur: ProductKleur,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      console.log("Product created");
      res.redirect("admin");
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
        path: "edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

// Update het geselecteerde product.
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedProductNaam = req.body.ProductNaam;
  const updatedProductImg = req.body.ProductImg;
  const updatedProductBeschrijving = req.body.ProductBeschrijving;
  const updatedProductPrijs = req.body.ProductPrijs;
  const updatedProductCategorie = req.body.ProductCategorie;
  const updatedProductMaat = req.body.ProductMaat;
  const updatedProductKleur = req.body.ProductKleur;

  Product.findById(prodId)
    .then((product) => {
      product.ProductNaam = updatedProductNaam;
      product.ProductPrijs = updatedProductPrijs;
      product.ProductBeschrijving = updatedProductBeschrijving;
      product.ProductImg = `../img/Producten/${updatedProductImg}`;
      product.ProductCategorie = updatedProductCategorie;
      product.ProductMaat = updatedProductMaat;
      product.ProductKleur = updatedProductKleur;
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
