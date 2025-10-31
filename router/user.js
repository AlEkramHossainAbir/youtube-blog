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
  if(!req.body)
    {
      res.redirect("/user/signup")
    }

    console.log(req.body)
  const { firstName, lastName, email, password } = req.body;
  
  
  if (!firstName || !lastName || !email || !password) {
    return res.render("signup", { error: "All fields are required." });
  }
  console.log(email, password);

  await User.create({ firstName, lastName, email, password });

  res.redirect("/");
});

router.get("/",async (req,res)=>{
 const allUser = await User.find({})
  res.json(allUser)
})

module.exports = router;
