const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.getLogin = (req, res) => {
  res.status(200).render("auth/login", {
    pageTitle: "Login",
    path: "/login",
  });
};

exports.getSignUp = (req, res) => {
  res.status(200).render("auth/signUp", {
    pageTitle: "Sign Up",
    path: "/signUp",
  });
};

exports.postSignUp = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (!password === confirmPassword) return res.redirect("/signup");

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        console.log("Er is al een user met deze email.");
        return res.redirect("/signup");
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      console.log("User aangemaakt");
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
