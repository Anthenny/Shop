const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");

exports.getLogin = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.status(200).render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: message,
    oldInput: {
      email: "",
    },
  });
};

exports.getSignUp = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.status(200).render("auth/signUp", {
    pageTitle: "Sign Up",
    path: "/signUp",
    errorMessage: message,
    oldInput: {
      name: "",
      email: "",
      plaats: "",
      adres: "",
    },
  });
};

exports.getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/login");
  });
};

exports.postSignUp = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const plaats = req.body.plaats;
  const adres = req.body.adres;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(402).render("auth/signUp", {
      pageTitle: "Sign Up",
      path: "/signUp",
      errorMessage: errors.array()[0].msg,
      oldInput: { name: name, email: email, plaats: plaats, adres: adres },
    });
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Er is al een gebruiker met dit email adress.");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            email: email,
            plaats: plaats,
            adres: adres,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => res.redirect("/login"));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      path: "/login",
      errorMessage: errors.array()[0].msg,
      oldInput: { email: email },
    });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        errorMessage: "Geen gebruiker met deze email gevonden.",
        oldInput: { email: email },
      });
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (!doMatch) {
          return res.status(422).render("auth/login", {
            pageTitle: "Login",
            path: "/login",
            errorMessage: "Password matched niet",
            oldInput: { email: email },
          });
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/login");
      });
  });
};

// Clean zou zijn functies te importeren hier en alleen de variabelen in te vullen in de parameters. vooral post login en signup om het lean te houden.
