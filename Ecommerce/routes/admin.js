const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/Add-product", adminController.getAddEditProduct);
router.get("/admin", adminController.getProducts);
router.post("/Add-product", adminController.postAddproduct);
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
