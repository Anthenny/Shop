const express = require("express");
const tasController = require("../controllers/tasController");
const router = express.Router();

router.get("/tassen", tasController.getAllTassen);
router.post("/kleurTassen", tasController.postKleurTassen);
router.post("/prijsTassen", tasController.postPrijsTassen);

module.exports = router;
