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
      
    
        const existingUser = await UserModel.findOne({ email: email, _id: { $ne: id } });
        if (existingUser) {
            const error = "Email is already in use by another user.";
            return [error, null];
        }
     if (!firstName){
        existingUser.firstName = firstName;
        
     } else {
        existingUser.firstName =existingUser.firstName
     }
        
     existingUser.lastName = lastName;
     existingUser.email = email;

        if (password !== "") {
            existingUser.password = password;
        } else {
            existingUser.password = existingUser.password;
        }
        if (phoneNumber !== undefined){
            existingUser.phoneNumber = phoneNumber;
    }  else {
        existingUser.phoneNumber =existingUser.phoneNumber
    }
     if (image !== ""){
        existingUser.image = image;
     } else {
        existingUser.image=user.image
     }

     if (userActive !== undefined){
        existingUser.userActive = userActive;
     } else {
        existingUser.userActive= user.userActive
     }
        if (userType != [""]){
            existingUser.userType = userType;
        } else {
            existingUser.userType =  user.userType
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
const updateUserType = async (id, userType) => {
    if (id === undefined) {
        return ["Invalid ID", null];
    }

    try {
        const existingUser = await UserModel.findById(id);

        if (!existingUser) {
            return ["No user found with that ID", null];
        }

       
        if (userType !== undefined && userType.length !== 0) {
            existingUser.userType = userType;
        }

        await existingUser.save();

        return [null, existingUser];
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
    createUser,
    updateUserType
};

export  {
    getAllUsers,
    getUsersById,
    updateUser,
    removeUser,
    createUser,
    updateUserType
}