import reservationsController from "./reservationsController.js";
import houseController from "../houseController/houseController.js";

const requestReservation = async (req, res) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const guestCount = parseInt(req.query.guestCount, 10);
    const location= req.query.location
    const id= req.query.id
    const [lat, lon] = location.split(",").map(coord => parseFloat(coord.trim()));

    const [error, overlappingReservations] = await reservationsController.getReservationsByDateRange(startDate, endDate);
  
    const [error1, houses] = await houseController.getAllHouses();
  
    const availableHouses = houses.filter((house) => {
      const isHouseAvailable = !overlappingReservations.some((reservation) => reservation.houseId.equals(house._id));
      const isGuestCountValid = house.guestCount >= guestCount;
  const isUserid= house.userId!==id;
      return isHouseAvailable && isGuestCountValid&&isUserid;
    });
 
    const maxdist = 20;
    
    
  
    const resultHouses = availableHouses.filter((house) => {
       
        const locationArray = house.locationValue.split(',').map(coord => parseFloat(coord.trim()));
      
    
        
        let lathouse = locationArray[0];
        let lonhouse = locationArray[1];
       
        const distancia = calcularDistancia(lathouse, lonhouse, lat, lon);
        
        return distancia <= maxdist;
    });
    
    const month = new Date(startDate).getMonth() + 1; 
  
    const finalResult = await Promise.all(resultHouses.map(async (originalelement) => {
        
        const days = calculateDiffBetweenDays(startDate, endDate);
        const element=   { ...originalelement._doc }; 
        element.days = days;
        element.startDate= startDate
        element.endDate= endDate
        element.guestUserid= req.id
        
        let price = element.price * days;
        element.originalPrice= element.price
        const month = new Date(startDate).getMonth() + 1;
    
        if (month === 8) {
            price = price * 1.5;
        } else if (month === 7) {
            price = price * 1.25;
        }
    
        if (days >= 15) {
            price = price - price * 0.1;
        }
    
        element.price = price;
    
        
        return element;
    }));
    
    
    
  
    res.status(200).json({ Result: finalResult, session: req.session });
  };

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c; // Distancia en kilómetros
    return distancia;
}


const calculateDiffBetweenDays = (startDate, endDate) => {
    const diff = new Date(endDate) - new Date(startDate);
    const daydiff = diff / (1000 * 60 * 60 * 24);
    return daydiff;
};

export default {
    requestReservation
}
