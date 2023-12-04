import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
    },
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'house', 
    },
    startDate: {
        type: Date,
      },
    endDate: {
        type: Date,
      },
      price: {
        type: Number,
      },
      createdAt: {
        type: Date,
        default: Date.now
      },

})

const reservationModel = mongoose.model('reservation', reservationSchema);
  
 export default reservationModel;