import citiesModel from "../../models/citiesModel.js"


const getApiCities = async (req, res) => {
    const busqueda = req.query.value;
    console.log(busqueda)
    try {
        const [error, cities] = await getCities(busqueda);
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
        
        const cities= await citiesModel.find({ name: new RegExp(busqueda, 'i') });
        console.log(typeof cities[0].pop)
        const resultCities = cities.sort((a, b) => {
            const popA = Number(a.pop);
            const popB = Number(b.pop);
            return popB - popA;
          });


        return [null, resultCities];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }

};



export  {getApiCities};