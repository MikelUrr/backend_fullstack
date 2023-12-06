import houseController from "./houseController.js";


const  getAllHouses = async (req, res) =>{
    try {
        const errorMessage = req.query.error;
        const [error, houses] = await houseController.getAllHouses();
        if (error) {
            return res.status(500).json({ error: error });
        }
        
        res.status(200).json({ houses, errorMessage, session: req.session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

const getHousesById = async (req, res) => {
    const id = req.params.id;
    try {
        const [error, house] = await houseController.getHousesById(id);
        if (error) {
            return res.status(404).json({ error: error });
        }
        res.status(200).json({ house });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

const updateHouse = async (req, res) => {
    const id = req.params.id;
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId } = req.body;

    try {
       

        const [error, house] = await houseController.updateHouse(id, title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId);

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ message: "House updated successfully", house });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};


const removeHouse = async (req, res) => {
    const { id } = req.body;

    try {
        const [error, house] = await houseController.removeHouse(id);

        if (error) {
            return res.status(404).json({ error: "No record found with that ID." });
        }

        return res.status(200).json({ success: true, house });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const createHouse = async (req, res) => {
    
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId } = req.body;

    try {
       
        const [error, house] = await houseController.createHouse(title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId);

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(201).json({ message: "House created successfully", house });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

