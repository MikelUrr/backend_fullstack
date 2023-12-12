import reservationsController from "./reservationsController.js";

const getAllReservations = async (req, res) => {
    try {
        const errorMessage = req.query.error;
        const [error, reservations] = await reservationsController.getAllReservations();
        if (error) {
            return res.status(500).json({ error: error });
        }

        res.status(200).json({ reservations, errorMessage, session: req.session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};



const getReservationById = async (req, res) => {
    const id = req.params.id;
    try {
        const [error, reservation] = await reservationsController.getReservationById(id);
        if (error) {
            return res.status(404).json({ error: error });
        }
        res.status(200).json({ reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const getReservationByuserId = async (req, res) => {
    const id = req.params.id;
    try {
        const [error, reservation] = await reservationsController.getReservationsByUserId(id);
        if (error) {
            return res.status(404).json({ error: error });
        }
        res.status(200).json({ reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};
const getReservationByhouseId = async (req, res) => {
    const id = req.params.id;
    try {
        const [error, reservation] = await reservationsController.getReservationsByhouseId(id);
        if (error) {
            return res.status(404).json({ error: error });
        }
        res.status(200).json({ reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const updateReservation = async (req, res) => {
    const id = req.params.id;
    const { userId, houseId, startDate, endDate, price } = req.body;

    try {
        const [error, reservation] = await reservationsController.updateReservation(id, userId, houseId, startDate, endDate, price);

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ message: "Reservation updated successfully", reservation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const removeReservation = async (req, res) => {
    const { id } = req.body;

    try {
        const [error, reservation] = await reservationsController.removeReservation(id);

        if (error) {
            return res.status(404).json({ error: "No record found with that ID." });
        }

        return res.status(200).json({ success: true, reservation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const createReservation = async (req, res) => {
    const { userId, houseId, startDate, endDate, price } = req.body;

    try {
        if (startDate>endDate){return res.status(400).json({ message: "Startdate is greater than endDate" });}
        const [error, reservation] = await reservationsController.createReservation(userId, houseId, startDate, endDate, price);
   
        if (error) {
            return res.status(400).json({ error });
        }

        res.status(201).json({ message: "Reservation created successfully", reservation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

export default {
    getAllReservations,
    getReservationById,
    updateReservation,
    removeReservation,
    createReservation,
    getReservationByuserId,
    getReservationByhouseId
};
