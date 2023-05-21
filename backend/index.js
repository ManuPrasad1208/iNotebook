const connectToMongo=require('./db');

const express=require("express");
const app=express();

connectToMongo();

app.get("/",(req,res)=>{
    res.send("HEYA!");
})
const port=3000;
app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`);
})