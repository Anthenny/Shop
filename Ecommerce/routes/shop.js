const express = require("express");
const shopController = require("../controllers/shopController");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/", shopController.getHome);
router.get("/winkelmand", isAuth.isAuth, shopController.getWinkeland);
router.get("/oorbellen", shopController.getOorbellen);
router.get("/productSpecificatie", shopController.getProductSpecificatie);
router.get("/profiel", isAuth.isAuth, shopController.getProfiel);
router.get("/bestellingen", isAuth.isAuth, shopController.getKlantBestelingen);
router.get("/productSpecificatie/:productId", shopController.getProduct);
router.get("/retourneren", shopController.getRetourneren);
router.get("/inspiratie", shopController.getInspiratie);
router.get("/contact", shopController.getContact);
router.get("/succesPage", shopController.getSuccesPage);

router.post("/winkelmand", shopController.postWinkelmand);
router.post("/winkelmand-delete-item", shopController.postWinkelmandDeleteProduct);

router.post("/create-order", shopController.postOrder);
router.post("/kleurOorbel", shopController.postKleurOorbel);
router.post("/prijsOorbellen", shopController.postPrijsOorbellen);

module.exports = router;
