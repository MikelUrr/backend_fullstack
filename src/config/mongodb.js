import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const uri = `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`;

const connection = mongoose.connect(uri)
    .then(() => {
        console.log("Successful connection to the database.");
    })
    .catch((error) => {
        console.error("Error connecting to the database.");
        console.error(error);
        throw error;
    });

export default connection;
