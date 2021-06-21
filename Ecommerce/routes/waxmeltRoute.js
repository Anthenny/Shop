const express = require("express");
const waxmeltController = require("../controllers/waxmeltController");
const router = express.Router();

router.get("/waxmelts", waxmeltController.getAllWaxmelts);
router.post("/kleurWaxmelts", waxmeltController.postKleurWaxmelts);
router.post("/prijsWaxmelts", waxmeltController.postPrijsWaxmelts);

module.exports = router;
