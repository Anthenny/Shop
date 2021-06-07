const express = require("express");
const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/login", isAuth.isAuth, authController.getLogin);
router.get("/signup", isAuth.isAuth, authController.getSignUp);
router.get("/logout", authController.getLogout);
router.post("/signup", isAuth.isAuth, authController.postSignUp);
router.post("/login", isAuth.isAuth, authController.postLogIn);

module.exports = router;
