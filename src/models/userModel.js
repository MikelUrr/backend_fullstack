import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";



const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      
    },
    lastName: {
      type: String,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      
    },
    image: {
      type: String,
      
    },
    userActive: {
        type: Boolean,
        default: true,
    },
    userType:{
      type: [String],
      default: ["guest"]
    },
    createdAt: {
      type: Date,
      default: Date.now
  },
    
  });
  
  const userModel = mongoose.model('user', userSchema);
  
 export default userModel;