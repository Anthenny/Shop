const express = require("express");
const shopController = require("../controllers/shopController");
const router = express.Router();

// const router = require("express").express.Router();

router.get("/", shopController.getHome);
router.get("/login", shopController.getLogin);
router.get("/signup", shopController.getSignUp);
router.get("/bestellingen", shopController.getBestellingen);
router.get("/winkelmand", shopController.getWinkeland);
router.get("/oorbellen", shopController.getOorbellen);

module.exports = router;
