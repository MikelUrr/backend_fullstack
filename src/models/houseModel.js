import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";

const houseSchema = new mongoose.Schema({

    title: {
        type: String,
        
      },

      description: {
        type: String,
        
      },
      imageSrc: {
        type: [String],
        
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      category: {
        type: String,
        
      },
      roomCount: {
        type: Number,
      },
      bathroomCount: {
        type: Number,
      },
      guestCount: {
        type: Number,
      },
      locationValue: {
        type: String,
        
      },
      amenities: {
        type: [String],
        
      },
      price: {
        type: Number,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
    },




})

const houseModel = mongoose.model('house', houseSchema);
  
 export default houseModel;