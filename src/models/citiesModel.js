import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";

const citiesSchema = new mongoose.Schema({

    id: {
        type: String,
     
      },

      name: {
        type: String,
        
      },
      country: {
        type: String,
        
      },
      name: {
        type: String,
        
      },
      admin1: {
        type: String,
        
      },
      lat: {
        type: String,
        
      },
      lon: {
        type: String,
        
      },
      pop: {
        type: String,
        
      },


})

const citiesModel = mongoose.model('house', citiesSchema);
  
 export default houseModel;