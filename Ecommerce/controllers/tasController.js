const Product = require("../models/product");

exports.getAllTassen = async (req, res) => {
  try {
    const products = await Product.find({ productCategorie: "tassen" });

    res.status(200).render("shop/tassen", {
      prods: products,
      pageTitle: "Tassen",
      pageDesc: "Bekijk de mooiste tassen!",
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

    if (color === "alles") products = await Product.find({ productCategorie: "tassen" });

    if (color !== "alles") products = await Product.find({ productKleur: color, productCategorie: "tassen" });

    res.status(200).render("shop/tassen", {
      prods: products,
      pageTitle: "Tassen",
      pageDesc: "Bekijk de mooiste tassen!",
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
    if (price === "alles") products = await Product.find({ productCategorie: "tassen" });

    if (price === "laagHoog")
      products = await Product.find({
        $or: [{ productCategorie: "tassen" }],
      }).sort({ productPrijs: "asc" });

    if (price === "hoogLaag")
      products = await Product.find({
        $or: [{ productCategorie: "tassen" }],
      }).sort({ productPrijs: "desc" });

    res.status(200).render("shop/tassen", {
      prods: products,
      pageTitle: "Tassen",
      path: "/prijsTassen",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};
