import UserModel from "../../models/userModel.js"


const getApiCities = async (req, res) => {
    const busqueda = req.quyery.value;
    console.log(value)
    try {
        const [error, cities] = await houseController.getCities(busqueda);
        if (error) {
            return res.status(404).json({ error: error });
        }
        res.status(200).json({ cities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}



const getCities = async (busqueda) =>{
    try {
        const cities= await UserModel.find({ name: new RegExp(busqueda, 'i') });
        const resultcities=cities.sort((a, b) => (a.pop === false && b.pop === true) ? -1 : 1);


        return [null, resultcities];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }

};



export default getApiCities;