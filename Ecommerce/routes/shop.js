const express = require("express");
const shopController = require("../controllers/shopController");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/", shopController.getHome);
router.get("/bestellingen", isAuth.isNotAuth, shopController.getBestellingen);
router.get("/winkelmand", isAuth.isNotAuth, shopController.getWinkeland);
router.get("/oorbellen", shopController.getOorbellen);
router.get("/profiel", isAuth.isNotAuth, shopController.getProfiel);

module.exports = router;
