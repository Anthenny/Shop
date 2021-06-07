const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// alle GET methods
router.get("/Add-product", adminController.getAddEditProduct);
router.get("/admin", adminController.getProducts);

// alle POST methods
router.post("/Add-product", adminController.postAddproduct);
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
