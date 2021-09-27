const Product = require("../models/product");

exports.getAllOorbellen = async (req, res) => {
  try {
    const products = await Product.find({ productCategorie: "oorbellen" });

    res.status(200).render("shop/oorbellen", {
      prods: products,
      pageTitle: "Oorbellen",
      pageDesc: "Bekijk de beste oorbellen",
      path: "/oorbellen",
    });
  } catch {
    // Ruimte voor nog een error page oops er ging iets fout.
    console.log("Ik kon niet al uw oorbellen laden.");
  }
};

exports.postKleurOorbellen = async (req, res) => {
  try {
    const color = req.body.kleur;
    let products = [];

    if (color === "alles") products = await Product.find({ productCategorie: "oorbellen" });

    if (color !== "alles") products = await Product.find({ productKleur: color, productCategorie: "oorbellen" });

    res.status(200).render("shop/oorbellen", {
      prods: products,
      pageTitle: "Oorbellen",
      pageDesc: "Bekijk de beste oorbellen",
      path: "/kleurOorbellen",
    });
  } catch {
    console.log("er ging iets fout");
  }
};

exports.postPrijsOorbellen = async (req, res) => {
  try {
    const price = req.body.prijs;
    let products = [];
    if (price === "alles") products = await Product.find({ productCategorie: "oorbellen" });

    if (price === "laagHoog")
      products = await Product.find({
        $or: [{ productCategorie: "oorbellen" }],
      }).sort({ productPrijs: "asc" });

    if (price === "hoogLaag")
      products = await Product.find({
        $or: [{ productCategorie: "oorbellen" }],
      }).sort({ productPrijs: "desc" });

    res.status(200).render("shop/oorbellen", {
      prods: products,
      pageTitle: "Oorbellen",
      path: "/prijsOorbellen",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};
