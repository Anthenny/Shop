const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/Add-product", adminController.getAddProduct);
router.get("/admin", adminController.getProducts);
router.post("/Add-product", adminController.postAddproduct);
router.post("/delete-product", adminController.postDeleteProduct);
router.get(
  "/edit-product/:productId",
  adminController.getEditProduct
);
router.post(
  "/edit-product/edit-product",
  adminController.postEditProduct
);

module.exports = router;
