const mongoose=require("mongoose");
const mongouri="mongodb://localhost:27017/inotebook";

const connectToMongo=async()=>{
    try{
        await mongoose.connect(mongouri);
        console.log("connected successfully to mongo");
    }
    catch(err){
        console.log(err);
    };
}
module.exports=connectToMongo;