const Product = require("../models/product");

exports.getAllBabyAccessoires = async (req, res) => {
  try {
    const products = await Product.find({ ProductCategorie: "babyaccessoires" });

    res.status(200).render("shop/babyaccessoires", {
      prods: products,
      pageTitle: "Baby Accessoires",
      path: "/babyaccessoires",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};

exports.postKleurBabyAccessoires = async (req, res) => {
  try {
    const color = req.body.kleurBaby;
    let products = [];

    if (color === "alles") products = await Product.find({ ProductCategorie: "babyaccessoires" });

    if (color !== "alles") products = await Product.find({ ProductKleur: color, ProductCategorie: "babyaccessoires" });

    res.status(200).render("shop/babyaccessoires", {
      prods: products,
      pageTitle: "Baby Accessoires",
      path: "/kleurBabyAccessoires",
    });
  } catch {
    console.log("er ging iets fout");
  }
};

exports.postPrijsBabyAccessoires = async (req, res) => {
  try {
    const price = req.body.prijsBaby;
    let products = [];
    if (price === "alles") products = await Product.find({ ProductCategorie: "babyaccessoires" });

    if (price === "laagHoog")
      products = await Product.find({
        $or: [{ ProductCategorie: "babyaccessoires" }],
      }).sort({ ProductPrijs: "asc" });

    if (price === "hoogLaag")
      products = await Product.find({
        $or: [{ ProductCategorie: "babyaccessoires" }],
      }).sort({ ProductPrijs: "desc" });

    res.status(200).render("shop/babyaccessoires", {
      prods: products,
      pageTitle: "Baby Accessoires",
      path: "/prijsBabyAccessoires",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};
