const express = require("express");
const isAuth = require("../middleware/is-auth");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/Add-product", isAuth.isNotAuth, adminController.getAddProduct);
router.get("/admin", isAuth.isNotAuth, adminController.getProducts);
router.post("/Add-product", isAuth.isNotAuth, adminController.postAddproduct);
router.post("/delete-product", isAuth.isNotAuth, adminController.postDeleteProduct);
router.get("/edit-product/:productId", isAuth.isNotAuth, adminController.getEditProduct);
router.post("/edit-product/edit-product", isAuth.isNotAuth, adminController.postEditProduct);

module.exports = router;
