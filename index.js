import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from 'cors';
import router from "./src/routes/router.js"


const PORT = 3000;
dotenv.config();

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
};

const app = express();

app.use(session(sessionConfig));


app.use(cors());


app.use(express.static("img"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => console.log("Servidor web en marcha en puerto 3000."));