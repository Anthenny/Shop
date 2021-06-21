const Product = require("../models/product");

exports.getAllWaxmelts = async (req, res) => {
  try {
    const products = await Product.find({ productCategorie: "waxmelts" });

    res.status(200).render("shop/waxmelts", {
      prods: products,
      pageTitle: "Wax Melts",
      path: "/waxmelts",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};

exports.postKleurWaxmelts = async (req, res) => {
  try {
    const color = req.body.kleurWaxmelts;
    let products = [];

    if (color === "alles") products = await Product.find({ productCategorie: "waxmelts" });

    if (color !== "alles") products = await Product.find({ productKleur: color, productCategorie: "waxmelts" });

    res.status(200).render("shop/waxmelts", {
      prods: products,
      pageTitle: "Wax Melts",
      path: "/kleurWaxmelts",
    });
  } catch {
    console.log("er ging iets fout");
  }
};

exports.postPrijsWaxmelts = async (req, res) => {
  try {
    const price = req.body.prijsWaxmelts;
    let products = [];
    if (price === "alles") products = await Product.find({ productCategorie: "waxmelts" });

    if (price === "laagHoog")
      products = await Product.find({
        $or: [{ productCategorie: "waxmelts" }],
      }).sort({ productPrijs: "asc" });

    if (price === "hoogLaag")
      products = await Product.find({
        $or: [{ productCategorie: "waxmelts" }],
      }).sort({ productPrijs: "desc" });

    res.status(200).render("shop/waxmelts", {
      prods: products,
      pageTitle: "Wax Melts",
      path: "/prijsWaxmelts",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};
