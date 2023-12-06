import UserModel from "../../models/userModel.js"



const getAllUsers = async () =>{
    try {
        const users= await UserModel.find({});
        users.sort((a, b) => (a.userAtive === false && b.userAtive === true) ? -1 : 1);


        return [null, users];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }

};

const getUsersById = async (id)=> {
    try {
        const user= await UserModel.findById(id).exec();
        return [null, user];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
    
}

const createUser = async (firstName, lastName, email, password, phoneNumber, image,userActive, userType) => {
    try {
        const newUser = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            image: image,
            userActive: userActive,
            userType: userType,
        });

        const savedUser = await newUser.save();
        
        return [null, savedUser];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};


const updateUser = async (id, firstName, lastName, email, password, phoneNumber, image, userActive, userType) => {
    if (id === undefined) {
        const error = "Invalid ID";
        return [error, null];
    }

    try {
        const user = await UserModel.findById(id);
        
        if (!user) {
            const error = "User with the provided ID has not been found";
            return [error, null];
        }

    
        const existingUser = await UserModel.findOne({ email: email, _id: { $ne: id } });
        if (existingUser) {
            const error = "Email is already in use by another user.";
            return [error, null];
        }
     if (firstName!== ""){
        user.firstName = firstName;
        
     } else {
        user.firstName =user.firstName
     }
        
        user.lastName = lastName;
        user.email = email;

        if (password !== "") {
            user.password = password;
        } else {
            user.password = user.password;
        }
        if (phoneNumber !== undefined){
        user.phoneNumber = phoneNumber;
    }  else {
        user.phoneNumber =user.phoneNumber
    }
     if (image !== ""){
        user.image = image;
     } else {
        user.image=user.image
     }

     if (userActive !== undefined){
        user.userActive = userActive;
     } else {
        user.userActive= user.userActive
     }
        if (userType != [""]){
            user.userType = userType;
        } else {
            user.userType =  user.userType
        }
        
        await user.save();

        return [null, user];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};


const removeUser = async (id) => {
    try {
        const user = await UserModel.findById(id);
        
        if (!user) {
            const error = "No user found with that ID";
            return [error, null];
        }


        await user.deleteOne();

        return [null, user];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};



export default {
    getAllUsers,
    getUsersById,
    updateUser,
    removeUser,
    createUser
};

export  {
    getAllUsers,
    getUsersById,
    updateUser,
    removeUser,
    createUser
}