//authentication using express router

const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

const bcrypt = require("bcrypt");

//jwt
const jwt = require("jsonwebtoken");

//jwt secret--->we will sign webtoken with this secret
//to check wether payload data is changed or not
const JWT_SECRET = "iamnisachar";

const fetchuser=require("../middleware/fetchuser.js")
//express validator
const { body, validationResult } = require("express-validator");

//we will use router.post here not router.get because your password can be seen in your log or url

//ROUTE 1: create a user  using POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send(`Hello, ${req.body}!`);
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      // creating a new user
      user = User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({authtoken});
      // res.send({ errors: result.array() });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 2: Authenticate a user using POST "/api/auth/login"

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    //destructuring......taking out email and password
    const {email,password}=req.body;

    try{
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }
      //bcrypt compare password
      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({authtoken});
    }

    catch(error){
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
  );

  //ROUTE 3: get logged in user detail using : POST "/api/auth/getuser" .Login required
  //here fetchuser is a middleware

  //whenever we find routes which requires authentication we will use the middleware fetchuser to fetch userId from jwt token
  router.post("/getuser",fetchuser,async (req, res) => {

      try{
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
      }
      catch(error){
        console.error(error.message);
        res.status(500).send("internal server error");
      }
    }
    );

module.exports = router;
