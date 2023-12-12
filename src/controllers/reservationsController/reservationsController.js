import reservationModel from "./../../models/reservationModel.js";

const getAllReservations = async () => {
    try {
        const reservations = await reservationModel.find({}).populate('userId').populate('houseId').exec();
        reservations.sort((a, b) => a.createdAt - b.createdAt);

        return [null, reservations];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};
const getReservationsByDateRange = async (startDate, endDate) => {
    try {
        const reservations = await reservationModel.find({
            $or: [
                { $and: [{ startDate: { $lte: endDate } }, { endDate: { $gte: startDate } }] },
                { $and: [{ startDate: { $gte: startDate } }, { startDate: { $lte: endDate } }] },
                { $and: [{ startDate: { $lte: startDate } }, { endDate: { $gte: endDate } }] }
            ]
        }).exec();

        return [null, reservations];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const getReservationById = async (id) => {
    try {
        const reservation = await reservationModel.findById(id).populate('userId').populate('houseId').exec();
        return [null, reservation];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const getReservationsByUserId = async (userId) => {
    try {
        const reservations = await reservationModel.find({ userId: userId }).populate('userId').populate('houseId').exec();
        return [null, reservations];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};
const getReservationsByhouseId = async (houseId) => {
    try {
        const reservations = await reservationModel.find({ houseId: houseId }).populate('userId').populate('houseId').exec();
        return [null, reservations];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};


const createReservation = async (userId, houseId, startDate, endDate, price) => {
    try {
        const newReservation = new reservationModel({
            userId: userId,
            houseId: houseId,
            startDate: startDate,
            endDate: endDate,
            price: price,
        });

        const savedReservation = await newReservation.save();

        return [null, savedReservation];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const updateReservation = async (id, userId, houseId, startDate, endDate, price) => {
    if (id === undefined) {
        const error = "Invalid ID";
        return [error, null];
    }

    try {
        const reservation = await reservationModel.findById(id);

        if (!reservation) {
            const error = "Reservation with the provided ID has not been found";
            return [error, null];
        }

        reservation.userId = userId;
        reservation.houseId = houseId;
        reservation.startDate = startDate;
        reservation.endDate = endDate;
        reservation.price = price;

        await reservation.save();

        return [null, reservation];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const removeReservation = async (id) => {
    try {
        const reservation = await reservationModel.findById(id);

        if (!reservation) {
            const error = "No reservation found with that ID";
            return [error, null];
        }

        await reservation.deleteOne();

        return [null, reservation];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

export default {
    getAllReservations,
    getReservationById,
    getReservationsByUserId,
    createReservation,
    updateReservation,
    removeReservation,
    getReservationsByDateRange,
    getReservationsByhouseId,
};
