import userController from "./userController.js";
import houseController from "./../houseController/houseController.js"
import bcrypt from "bcrypt";
import path from 'path';
import fs from 'fs';



const getHousesByUserId = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const [error, house] = await houseController.getHousesByUserId(id);
        if (error) {
            return res.status(404).json({ error: error });
        }
        res.status(200).json({ house });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}


const getAllUsers = async (req, res) => {
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
        if (password) {
            if (!isSecurePassword(password)) {
                return res.status(400).json({ error: "Contraseña no segura" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const [error, user] = await userController.updateUser(id, firstName, lastName, email, hashedPassword, phoneNumber, imageBase64, userActive, userType);

            if (error) {
                return res.status(400).json({ error });
            }

            res.status(200).json({ message: "User updated successfully", user });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};
const deactivateUser = async (req, res) => {
    const id = req.id;
    const { userActive } = req.body;

    try {
        if (!userActive) {
            return res.status(400).json({ error: "Error please enter a valid UserActive param" });
        }
        const [error, user] = await userController.deactivateUser(id, userActive);

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ message: "User state updated successfully" });
    } catch (error) {

    }

}
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
    const { firstName, lastName, email, password, confirmPassword, phoneNumber, userType } = req.body;

    try {
        let imageBase64 = null;

        if (req.file) {
            // Read the image file and convert it to base64 asynchronously
            const imageData = await fs.promises.readFile(path.join(__dirname, "/img/profile/" + req.file.filename));
            imageBase64 = Buffer.from(imageData).toString('base64');

            // Delete the image file
            fs.unlinkSync(path.join(__dirname, "/img/profile/" + req.file.filename));
        } else {
            imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD5El...';
        }

        if (password && password !== confirmPassword) {
            return res.status(400).json({ error: "La contraseña y la confirmación no coinciden." });
        }

        if (!isSecurePassword(password)) {
            return res.status(400).json({ error: "Contraseña no segura" });
        }

        if (!isEmailValid(email)) {
            return res.status(400).json({ error: "Formato de email no valido" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [errorexisting, existinguser] = await userController.getUserByEmail(email);

        if (existinguser) {
            if (existinguser.userActive === false) {
               
                const userActive = true;
                const user = await userController.updateUser(existinguser._id, firstName, lastName, email, hashedPassword, phoneNumber, imageBase64, userActive, userType);
                return res.status(201).json({ message: "User created successfully", user });
            }
        }

        
        const [error, user] = await userController.createUser(firstName, lastName, email, hashedPassword, phoneNumber, imageBase64, userType);
        
        if (error) {
            return res.status(400).json({ error });
        }
        
        return res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const isSecurePassword = (password) => {
    // Requisitos
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    // Validación
    const isValidLength = password.length >= minLength;
    const isValidPassword = isValidLength && hasUpperCase && hasLowerCase && hasSymbol;

    return isValidPassword;
};
const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


export default {
    getAllUsers,
    getusersById,
    updateUser,
    removeUser,
    createUser,
    getHousesByUserId,
    deactivateUser
};