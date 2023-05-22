//file name will start with capital letter since it is a model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotesSchema = new Schema({
  title:{
    type: String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  tag:{
    type:String,
    default:"General"
  },
  date:{
    type:Date,
    default:Date.now         //dont use Date.now() method here since we have to run only when we have inserted document. 
  }
});

// To use our schema definition, we need to convert our blogSchema into a Model we can work with.
//  To do so, we pass it into mongoose.model(modelName, schema):
module.exports=mongoose.model("Notes",NotesSchema);

