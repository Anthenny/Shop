const express = require("express");
const oorbelController = require("../controllers/oorbelController");
const router = express.Router();

router.get("/oorbellen", oorbelController.getAllOorbellen);
router.post("/kleurOorbellen", oorbelController.postKleurOorbellen);
router.post("/prijsOorbellen", oorbelController.postPrijsOorbellen);

module.exports = router;
