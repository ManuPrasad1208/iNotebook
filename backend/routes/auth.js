const express=require('express');
const router=express.Router();

const User=require('../models/User.js');

//we will use router.post here not router.get because your password can be seen in your log or url

router.post('/',(req,res)=>{
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send("hello"); 
})

module.exports=router;
