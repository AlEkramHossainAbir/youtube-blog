const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if(!firstName || !lastName || !email || !password) {
    return res.render("signup", { error: "All fields are required." });
  }

  await User.create({ firstName, lastName, email, password })
    .then(() => {
      res.redirect("/signin");
    })
    .catch((error) => {
      console.error(error);
      res.render("signup", { error: "Failed to create user." });
    });

    res.redirect("/");
});


module.exports = router;