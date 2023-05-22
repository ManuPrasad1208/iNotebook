//file name will start with capital letter since it is a model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now         //dont use Date.now() method here since we have to run only when we have inserted document. 
  }
});

// To use our schema definition, we need to convert our blogSchema into a Model we can work with.
//  To do so, we pass it into mongoose.model(modelName, schema):
module.exports=mongoose.model("User",UserSchema);

