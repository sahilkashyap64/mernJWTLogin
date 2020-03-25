const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: { type: String, required: true },
  
  name:{
    type:String,
    required: [true,'Name is neccesary']
},

  
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
