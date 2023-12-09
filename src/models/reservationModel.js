import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'house',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
      },
    endDate: {
        type: Date,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now
      },

})

const reservationModel = mongoose.model('reservation', reservationSchema);
  
 export default reservationModel;