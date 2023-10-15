const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
      type : String,
      required : true
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    favColor:{
      type : Array,
    }
  })

const userModel = mongoose.model("user",userSchema)

module.exports = userModel;