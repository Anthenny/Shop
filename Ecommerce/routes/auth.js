const express = require("express");
const { check, body } = require("express-validator/check");
const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/login", isAuth.isAuth, authController.getLogin);
router.get("/signup", isAuth.isAuth, authController.getSignUp);
router.get("/logout", authController.getLogout);
router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Vul aub een geldig email adres in..").normalizeEmail(),
    body("password", "Vul aub een wachtwoord in met minimaal 5 tekens.").isLength({ min: 5 }).trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("Wachtwoord moet met elkaar matchen!");
        return true;
      }),
  ],
  isAuth.isAuth,
  authController.postSignUp
);
router.post("/login", [body("email").isEmail().withMessage("Vul aub een geldig email adres in.").normalizeEmail(), body("password").trim()], isAuth.isAuth, authController.postLogIn);

module.exports = router;
