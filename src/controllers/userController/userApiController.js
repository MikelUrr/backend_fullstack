import userController from "./contactmeController.js";
import bcrypt from "bcrypt";

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
        res.status(200).json({ contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}


const updateUser = async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, email, password, confirmPassword, phoneNumber, image, userActive, userType } = req.body;
    
    try {
        const image = req.file ? `/images/blog/${req.file.filename}` : undefined;
        if (password && password !== confirmPassword) {
            return res.status(400).json({ error: "Password and confirmation do not match." });
        }

        let error;
        let user;

        if (password === "" || confirmPassword === "") {
            [error, user] = await userController.updateUser(id, firstName, lastName, email, password, phoneNumber, image, userActive, userType);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            [error, user] = await userController.updateUser(id, firstName, lastName, email, hashedPassword, phoneNumber, image, userActive, userType);
        }

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "EInternal server error. Please try again later." });
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
    console.log(req.body);
    const { firstName, lastName, email, password, confirmPassword, phoneNumber, userActive, userType } = req.body;
    let image = null;

       
    try {
        if (req.file) {
            image = "/img/profile/" + req.file.filename;
        } else {
            image = "/img/profile/nophoto.png"
        }

        if (password && password !== confirmPassword) {
            return res.status(400).json({ error: "La contraseña y la confirmación no coinciden." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [error, user] = await userController.createUser(firstName, lastName, email, hashedPassword, phoneNumber, image, userActive, userType);

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