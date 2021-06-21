const express = require("express");
const armbandController = require("../controllers/armbandController");
const router = express.Router();

router.get("/armbanden", armbandController.getAllArmbanden);
router.post("/kleurArmbanden", armbandController.postKleurArmbanden);
router.post("/prijsArmbanden", armbandController.postPrijsArmbanden);

module.exports = router;
