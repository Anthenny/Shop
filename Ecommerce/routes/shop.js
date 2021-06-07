const express = require("express");
const shopController = require("../controllers/shopController");
const router = express.Router();

router.get("/", shopController.getHome);
router.get("/bestellingen", shopController.getBestellingen);
router.get("/winkelmand", shopController.getWinkeland);
router.get("/oorbellen", shopController.getOorbellen);

module.exports = router;
