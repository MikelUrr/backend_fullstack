import UserModel from "../../models/userModel.js"

//crud de user


const getAllUsers = async () =>{
    try {
        const users= await UserModel.find({});
        users.sort((a, b) => (a.solicitudReactivacion === true && b.solicitudReactivacion === false) ? -1 : 1);


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

const createUser = async (nombre, email, fechaNacimiento, password, estacionPref, categoria, cuentaDesactivada,rol) => {
    try {
        const newUser = new UserModel({
            nombre: nombre,
            email: email,
            fechaNacimiento: fechaNacimiento,
            password: password,
            estacionPref: estacionPref,
            categoria: categoria,
            cuentaDesactivada: cuentaDesactivada,
            rol:rol,
        });

        const savedUser = await newUser.save();
        
        return [null, savedUser];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};



  const updateUser = async (id, nombre, email, fechaNacimiento, password, estacionPref, categoria, cuentaDesactivada,rol) => {

    if (id === undefined) {
        const error = "Tienes que especificar un ID válido";
        return [error, null];
    }

    try {
        const user = await UserModel.findById(id);
        
        if (!user) {
            const error = "No se ha encontrado un usuario con el ID proporcionado.";
            return [error, null];
        }

        // Verificar si el correo ya está en uso por otro usuario
        const existingUser = await UserModel.findOne({ email: email, _id: { $ne: id } }); // $ne  es not equal en mongo
        if (existingUser) {
            const error = "El correo ya está en uso por otro usuario.";
            return [error, null];
        }

        user.nombre = nombre;
        user.email = email;
        user.fechaNacimiento = fechaNacimiento;
        if(password!==""){
            user.password = password;
        }else{
            user.password = user.password;
        }
        
        user.estacionPref = estacionPref;
        user.categoria = categoria;
        
        if (cuentaDesactivada==="false") {
            user.solicitudReactivacion = false;
            user.cuentaDesactivada = cuentaDesactivada;
        }
        user.rol=rol;

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
            const error = "No se ha encontrado ningún usuario con ese ID.";
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