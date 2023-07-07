//authentication using express router

const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

const bcrypt = require('bcrypt');

//express validator
const { body, validationResult } = require("express-validator");

//we will use router.post here not router.get because your password can be seen in your log or url

router.post(
  "/",
  [
    body("name","Enter a valid name").isLength({min: 4,}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"password must be at least 5 characters").isLength({min:5})
  ],
  async (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send(`Hello, ${req.body}!`);
    }
    const saltRounds = 10;
    const salt= await bcrypt.genSalt(10);
    const secpass=await bcrypt.hash(req.body.password,salt);
    // creating a new user
    User.create({
      name:req.body.name,
      password:secpass,
      email:req.body.email
    }).then(user=>res.json(user)).catch(err=>res.json(err));
    // res.send({ errors: result.array() });
  } 
);

module.exports = router;
