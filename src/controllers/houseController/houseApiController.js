import houseController from "./houseController.js";
import userController from "./../userController/userController.js"
import path from 'path';
import fs from 'fs';

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


const getRandomHouses = async (req, res) => {
    try {
        const errorMessage = req.query.error;
        const [error, houses] = await houseController.getAllHouses();
        if (error) {
            return res.status(500).json({ error: error });
        }

        // Obtén el número específico de elementos aleatorios
        const numberOfRandomHouses = 2; // Puedes ajustar este número según tus necesidades
        const randomHouses = getRandomElements(houses, numberOfRandomHouses);

        res.status(200).json({ houses: randomHouses, errorMessage, session: req.session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

// Función para obtener elementos aleatorios de un array
function getRandomElements(array, numberOfElements) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numberOfElements);
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

const getHousesByUserId = async (req, res) => {
    const id = req.params.id;
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


const updateHouse = async (req, res) => {
    const id = req.params.id;
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId } = req.body;
    if (amenities!== undefined && amenities!==""){
      
        if (!validateAmenities(amenities)) {
           
            return res.status(400).json({ error: "Invalid amenities provided." });
          }}
          if (category!== undefined && category!==""){
            if (!validateCategory(category)) {
                
                return res.status(400).json({ error: "Invalid categories provided." });
              }}
        if(roomCount>9){
            return res.status(400).json({ error: "Rooms number must be lower than 9" });
        }
        if(bathroomCount>9){
            return res.status(400).json({ error: "bathroom number must be lower than 9" });
        }
        if(guestCount>20){
            return res.status(400).json({ error: "maximum number of guests reached" });
        }
    try {
       
        const newImages = req.files;
        const existingImageCount = imageSrc.length;
        if (newImages && existingImageCount + newImages.length > 5) {
          return res.status(400).json({ error: "Exceeded the maximum limit of 5 images." });
        }
        const imagePaths = [];

        
        if (newImages) {
          for (const file of newImages) {
            const imagePath = file.path; 
            imagePaths.push(imagePath);
          }
        }

        for (const existingImagePath of imageSrc) {
          imagePaths.push(existingImagePath);
        }
    
        const [error, house] = await houseController.updateHouse(id, title, description, imagePaths, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId);

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
    const { id } = req.params;
  
    try {
      
      const [error, house] = await houseController.getHouseById(id);
  
      if (error) {
        return res.status(404).json({ error: "No record found with that ID." });
      }
  
     
      const [removeError] = await houseController.removeHouse(id);
  
      if (removeError) {
        return res.status(500).json({ error: "Error while removing the house." });
      }
  
      
      const imageSrc = house.imageSrc || [];
      for (const imagePath of imageSrc) {
        try {
         
          fs.unlinkSync(imagePath);
          console.log(`File ${imagePath} deleted successfully.`);
        } catch (unlinkError) {
          console.error(`Error deleting file ${imagePath}: ${unlinkError.message}`);
        }
      }
  
      return res.status(200).json({ success: true, house });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  };

const createHouse = async (req, res) => {
    
    const { title, description, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId } = req.body;
    console.log(amenities)
   if (amenities !== undefined && amenities !== ""){
    console.log("no deberia estar aqui", amenities)
    if (!validateAmenities(amenities)) {
        
        return res.status(400).json({ error: "Invalid amenities provided." });
      }}
      if (category!== undefined && category!==""){
        if (!validateCategory(category)) {
            
            return res.status(400).json({ error: "Invalid categories provided." });
          }}
    if(roomCount>9){
        return res.status(400).json({ error: "Rooms number must be lower than 9" });
    }
    if(bathroomCount>9){
        return res.status(400).json({ error: "bathroom number must be lower than 9" });
    }
    if(guestCount>20){
        return res.status(400).json({ error: "maximum number of guests reached" });
    }
    try {
        
        const imagePaths = [];    
        for (const file of req.files) {
          const imagePath = file.path;  
          imagePaths.push(imagePath);
        }
    
       const [error, house] = await houseController.createHouse(title, description, imagePaths, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId);

        if (error) {
            return res.status(400).json({ error });
        }
        if (house){ 
            const userType="guest, owner";
            
            const [error, user]= await userController.updateUserType(userId,userType)

            user? console.log ("okkk", user.userType): console.log("error")
        }

        res.status(201).json({ message: "House created successfully", house });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const validateAmenities = (amenitiesString) => {
  
    const validAmenities = ['wifi', 'tv', 'swimming pool', 'bbq', 'garden', 'kitchen', 'parking', 'air conditioner', 'washer', 'hairdryer', 'iron', 'terrace'];

    
    const amenitiesArray = amenitiesString.split(',');

    for (const amenity of amenitiesArray) {
        const lowerCaseAmenity = amenity.trim().toLowerCase();  
        if (!validAmenities.includes(lowerCaseAmenity)) {
            
            return false;
        }
    }

    return true;
};
const validateCategory = (categoryvalues) => {
    const categoryString = ['chalet', 'apartment', 'flat'];
    const categoriesArray = categoryvalues.split(',');
  
    for (const cat of categoriesArray) {
      const lowerCaseCat = cat.trim().toLowerCase();  
      if (!categoryString.includes(lowerCaseCat)) {
        return false;
      }
    }
  
    return true;
  };
export default {
    getAllHouses,
    getHousesById,
    createHouse,
    updateHouse,
    removeHouse,
    getHousesByUserId,
    getRandomHouses
}