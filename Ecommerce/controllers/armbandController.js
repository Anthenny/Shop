const Product = require("../models/product");

exports.getAllArmbanden = async (req, res) => {
  try {
    const products = await Product.find({ ProductCategorie: "armbanden" });

    res.status(200).render("shop/armbanden", {
      prods: products,
      pageTitle: "Armbanden",
      path: "/armbanden",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};

exports.postKleurArmbanden = async (req, res) => {
  try {
    const color = req.body.kleurArmbanden;
    const products = await Product.find({ ProductKleur: color, ProductCategorie: "armbanden" });

    res.status(200).render("shop/armbanden", {
      prods: products,
      pageTitle: "Armbanden",
      path: "/kleurArmbanden",
    });
  } catch {
    console.log("er ging iets fout");
  }
};

exports.postPrijsArmbanden = async (req, res) => {
  try {
    const price = req.body.prijsArmbanden;
    let products = [];
    if (price === "alles") products = await Product.find({ ProductCategorie: "armbanden" });

    if (price === "laagHoog")
      products = await Product.find({
        $or: [{ ProductCategorie: "armbanden" }],
      }).sort({ ProductPrijs: "asc" });

    if (price === "hoogLaag")
      products = await Product.find({
        $or: [{ ProductCategorie: "armbanden" }],
      }).sort({ ProductPrijs: "desc" });

    res.status(200).render("shop/armbanden", {
      prods: products,
      pageTitle: "Armbanden",
      path: "/prijsArmbanden",
    });
  } catch {
    console.log("Er ging iets fout");
  }
};
