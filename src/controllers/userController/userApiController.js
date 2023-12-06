import userController from "./userController.js";
import bcrypt from "bcrypt";
import path from 'path';
import fs from 'fs';

const  getAllUsers = async (req, res) =>{
    try {
        const errorMessage = req.query.error;
        const [error, users] = await userController.getAllUsers();
        if (error) {
            return res.status(500).json({ error: error });
        }
        
        res.status(200).json({ users, errorMessage, session: req.session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

const getusersById = async (req, res) => {
    const id = req.params.id;
    try {
        const [error, user] = await userController.getUsersById(id);
        if (error) {
            return res.status(404).json({ error: error });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}


const updateUser = async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, email, password, confirmPassword, phoneNumber, userActive, userType } = req.body;
    
    try {
        const imageFilePath = req.file ? `/images/blog/${req.file.filename}` : undefined;
        let imageBase64 = null;

        if (req.file) {
            // Read the image file and convert it to base64
            const imageData = fs.readFileSync(path.join(__dirname, imageFilePath));
            imageBase64 = Buffer.from(imageData).toString('base64');

            // Delete the image file
            fs.unlinkSync(path.join(__dirname, imageFilePath));
        }

        if (password && password !== confirmPassword) {
            return res.status(400).json({ error: "Password and confirmation do not match." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [error, user] = await userController.updateUser(id, firstName, lastName, email, hashedPassword, phoneNumber, imageBase64, userActive, userType);

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};


const removeUser = async (req, res) => {
    const { id } = req.body;

    try {
        const [error, user] = await userController.removeUser(id);

        if (error) {
            return res.status(404).json({ error: "No record found with that ID." });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};


const createUser = async (req, res) => {
   
    const { firstName, lastName, email, password, confirmPassword, phoneNumber, userActive, userType } = req.body;
    
    try {
        let imageBase64 = null;

        if (req.file) {
            // Read the image file and convert it to base64
            const imageData = fs.readFileSync(path.join(__dirname, "/img/profile/" + req.file.filename));
            imageBase64 = Buffer.from(imageData).toString('base64');

            // Delete the image file
            fs.unlinkSync(path.join(__dirname, "/img/profile/" + req.file.filename));
        } else {
            imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD5ElEQVR4nO3Z708TdxwH8Ps/tidbnMkeiNEtPfDJsjVtr6W9o9CCRgdMEBDtLSyKeNkoGHjmj6jJSFziDxwLTIhC1GLBNWXZ/JUYoH1iMpIte7AF62XOjdJu2Xv5fuWa1ra0lV57l/BJ3sld73vt59XvXZr7lmE2a7PUKYPZuZ3Ra7FmftBg5v+tNPN7GT02z1oEkOgOUcXxO0jTCoAiLMI/rFloYPRSBo5306aTECS25k64RKn08Uh/ukRpolb8/J28AE5P95vW5oMvWK4GmkGIEuo8x5+5u6Q3cgLqROkaOaFDOoEqW20KoMrqxMTULciyXLIs/fwL+s5/pUDGcgLWpoyeOOm7g10aQbjILIjSH7kBa1OmnKwVhGutr4IBWkG4NgIg2Xb2O7DWVISBc6LitB/v3l4peuRiA8iblhIhqwEoJUIuNsAxtwLHXBQfBaLYcT4zYucZPz1OxtrnojAGoqiYzt5kx70F/L48gN+eDqDt3qK6AOH7aCKkuQ+GAmkIlnPC8uVM2tgKX3rz26dXsBwZAJ530yxHBlPGqQpQYrmQH6I6+BJiD0bxYSCK9/wvZyiSBHgaGaQzTF4nM1gSQCGITOmfX6QI0jzZTj6mKoAP/ArTSCtM37TS7Y0ghCxRDzC3AvPYERgvW2hqxj+DN7SKlqvBjIiPL86iNxRHbyiGrscx1P9QJkDPQhzecBxN/tFE80pa746iPxxH+0gQla8gKjkn2oZn6XESAml5uIpj8zEK616IofH+aqLxxvtReqzoAPLh3Y9+gmnYkQYwDdtx9OETOqYjD0SmeMNx+iUp+0UHeBf/Bj/Wnta8EsdYK3pDf2VFsJyAlks31kX0h1UENPqGsjavpMk3lGggG6JteKY8AOMVLieAjOn68VGiid0XToG1pj7VkSe9Vy+n3oVlHAr0ozNwgm6rA8jV/FpsI3vwxfwz9DxeAj/phulkTQZE0j0RisETPIO2mU4aT/AU+sKr5QOQ1E/2wX3rU9iv19Cshzj6YDrRvJIjD6bLCyDhvnUkAOsh6s/tTwO0z4rlB5D7oXpCyAMhwH2uOQ1RfgD5ffjamgIoBCFrAUAvpVH7ayFkrQCMVyywjfMFI2TNAMildJWD/bpQEEIuNkCtTPn8GZdsxqdu6gMg54nIG1AnHn+uLC1qBbFU4NLiBBlMFlS1gjhwzKsAruUENBzq2eoSpchGl8NfN7ZPDiPT0r61qeOFu6tnC5NPkXV4spStXE5aQBjIP0ecYx+jl2LNQkP6P0V8/H1j7duMXspg4l1JiP9YTuhk9FYGE+8i37wum1fKYHK8ldjZrM1iilr/A/fHEr4K4AtdAAAAAElFTkSuQmCC';
        }

        if (password && password !== confirmPassword) {
            return res.status(400).json({ error: "La contraseña y la confirmación no coinciden." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [error, user] = await userController.createUser(firstName, lastName, email, hashedPassword, phoneNumber, imageBase64, userActive, userType);

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};


export default {
    getAllUsers,
    getusersById,
    updateUser,
    removeUser,
    createUser
};