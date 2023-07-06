const connectToMongo=require('./db');

const express=require("express");
const app=express();

connectToMongo();

app.use(express.json());//app.use is used as middleware . here to send and get data in form of json we use this function

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


const port=3000;
app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`);
})