import reservationsController from "./reservationsController.js";
import houseController from "../houseController/houseController.js";

const requestReservation = async (req,res) =>{
   
    const {startDate, endDate, guestCount, location } = req.query;

        const [error, overlappingReservations] = await reservationsController.getReservationsByDateRange(startDate, endDate);
    
        const [error1, houses] = await houseController.getAllHouses();

        const availableHouses = houses.filter(house => {
            const isHouseAvailable = !overlappingReservations.some(reservation => reservation.houseId.equals(house._id));
            const isGuestCountValid = house.guestCount >= guestCount;
            
            return isHouseAvailable && isGuestCountValid;
        });
        
        
        const maxdist=20;
        const [lat, lon, city]=location.splite (",")

        const resultHouses = availableHouses.filter(house => {
            let distancia = calcularDistancia(house.locationValue.lat, house.locationValue.lon, lat, lon);
            return distancia <= maxdist;
        });
      
        if (error || error1) {
            return res.status(500).json({ error: error });
        }

        res.status(200).json({ resultHouses, errorMessage, session: req.session });
}


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