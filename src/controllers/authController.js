import Jwt from "jsonwebtoken";
import UserModel from "./../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        
        const oldUser = await UserModel.findOne({ email }); // Change here
        if (!oldUser) {
            res.status(404).send("User does not exist");
            return;
        }
        if(oldUser.userActive===false){
            res.status(404).send("User does not exist");
            return;
        }
        console.log("holaaa")
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) {
            res.status(400).send("Invalid credentials");
            return;
        }
        const token = Jwt.sign(
            { email: oldUser.email, id: oldUser._id }, 
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        /* send token in a cookie */
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000
        });

        res.status(200).json({
            result: {
                email: oldUser.email,
                id: oldUser._id
            },
            token
        });
    } catch (e) {
        console.error(e);
        res.status(500).send("Error logging user");
    }
};

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).send("Logged out");
};

export default { login, logout };
