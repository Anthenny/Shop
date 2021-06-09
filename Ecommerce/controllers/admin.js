const Product = require("../models/product");

exports.getAddEditProduct = (req, res, next) => {
  res.render("admin/Add-Edit-product", {
    pageTitle: "Product toevoegen",
    path: "Add-product",
    editing: false,
  });
};

exports.postAddproduct = (req, res, next) => {
  const ProductNaam = req.body.ProductNaam;
  const ProductImg = req.body.ProductImg;
  const ProductBeschrijving = req.body.ProductBeschrijving;
  const ProductPrijs = req.body.ProductPrijs;
  const ProductCategorie = req.body.ProductCategorie;
  const product = new Product({
    ProductNaam: ProductNaam,
    ProductImg: `../img/Producten/${ProductImg}`,
    ProductBeschrijving: ProductBeschrijving,
    ProductPrijs: ProductPrijs,
    ProductCategorie: ProductCategorie,
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

exports.getProducts = (req, res, next) => {
  Product.find()
    //     .select('title price -_id')
    //     .populate('userId', 'name')
    //     met select benoem je wat je van databse wil
    //     bijvoorbeel allen die title price en id
    .then((products) => {
      res.render("admin/admin", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log("Product deletet");
      res.redirect("admin");
    })
    .catch((err) => console.log(err));
};
