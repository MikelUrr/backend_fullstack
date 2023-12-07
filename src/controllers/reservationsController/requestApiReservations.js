import reservationsController from "./reservationsController.js";
import houseController from "../houseController/houseController.js";

const requestReservation = async (req, res) => {

    const { startDate, endDate, guestCount, location } = req.query;

    const [error, overlappingReservations] = await reservationsController.getReservationsByDateRange(startDate, endDate);

    const [error1, houses] = await houseController.getAllHouses();

    const availableHouses = houses.filter(house => {
        const isHouseAvailable = !overlappingReservations.some(reservation => reservation.houseId.equals(house._id));
        const isGuestCountValid = house.guestCount >= guestCount;

        return isHouseAvailable && isGuestCountValid;
    });


    const maxdist = 20;
    const [lat, lon, city] = location.splite(",")

    const resultHouses = availableHouses.filter(house => {
        let distancia = calcularDistancia(house.locationValue.lat, house.locationValue.lon, lat, lon);
        return distancia <= maxdist;
    });

    
    const mes= startDate.getMonth() + 1;
    const finalResult= resultHouses.forEach(element => {
       

    element.days=calculateDiffBetweenDays (startDate,endDate);
    
    if (mes === 8 ) {
        element.price= (element.price*0.5)+element.price

    } else if (mes === 7) {
        element.price= (element.price*0.25)+element.price
    }

    if(element.days>=15) {
        element.price= element.price-(element.price*0.10)
    }
        
        
    });
    

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


const calculateDiffBetweenDays = (startDate, endDate) => {

    var d1 = new Date("08/14/2020");
    var d2 = new Date("09/14/2020");

    var diff = d2.getTime() - d1.getTime();

    var daydiff = diff / (1000 * 60 * 60 * 24);

    
    return daydiff;
}


export default {
    requestReservation
}
