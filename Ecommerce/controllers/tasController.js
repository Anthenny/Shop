const Product = require("../models/product");

exports.getAllTassen = async (req, res) => {
  try {
    const products = await Product.find({ ProductCategorie: "tassen" });

    res.status(200).render("shop/tassen", {
      prods: products,
      pageTitle: "Tassen",
      path: "/tassen",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};

exports.postKleurTassen = async (req, res) => {
  try {
    const color = req.body.kleurTassen;
    let products = [];

    if (color === "alles") products = await Product.find({ ProductCategorie: "tassen" });

    if (color !== "alles") products = await Product.find({ ProductKleur: color, ProductCategorie: "tassen" });

    res.status(200).render("shop/tassen", {
      prods: products,
      pageTitle: "Tassen",
      path: "/kleurTassen",
    });
  } catch {
    console.log("er ging iets fout");
  }
};

exports.postPrijsTassen = async (req, res) => {
  try {
    const price = req.body.prijsTassen;
    let products = [];
    if (price === "alles") products = await Product.find({ ProductCategorie: "tassen" });

    if (price === "laagHoog")
      products = await Product.find({
        $or: [{ ProductCategorie: "tassen" }],
      }).sort({ ProductPrijs: "asc" });

    if (price === "hoogLaag")
      products = await Product.find({
        $or: [{ ProductCategorie: "tassen" }],
      }).sort({ ProductPrijs: "desc" });

    res.status(200).render("shop/tassen", {
      prods: products,
      pageTitle: "Tassen",
      path: "/prijsTassen",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};
