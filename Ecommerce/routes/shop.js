const express = require("express");
const shopController = require("../controllers/shopController");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/", shopController.getHome);
router.get("/winkelmand", isAuth.isAuth, shopController.getWinkeland);
router.get("/oorbellen", shopController.getOorbellen);
router.get("/armbanden", shopController.getArmbanden);
router.get("/tassen", shopController.getTassen);
router.get("/waxmelts", shopController.getWaxmelts);
router.get("/babyaccessoires", shopController.getBabyAccessoires);
router.get("/productSpecificatie", shopController.getProductSpecificatie);
router.get("/profiel", isAuth.isAuth, shopController.getProfiel);
router.get("/bestellingen", isAuth.isAuth, shopController.getBestellingen);
router.get("/productSpecificatie/:productId", shopController.getProduct);

router.post("/winkelmand", shopController.postWinkelmand);
router.post("/winkelmand-delete-item", shopController.postWinkelmandDeleteProduct);

module.exports = router;
