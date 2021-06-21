const express = require("express");
const babyController = require("../controllers/babyController");
const router = express.Router();

router.get("/babyaccessoires", babyController.getAllBabyAccessoires);
router.post("/kleurBabyAccessoires", babyController.postKleurBabyAccessoires);
router.post("/prijsBabyAccessoires", babyController.postPrijsBabyAccessoires);

module.exports = router;
