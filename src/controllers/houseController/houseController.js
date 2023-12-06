import houseModel from "./../../models/houseModel.js"



const getAllHouses = async () => {
    try {
        const houses = await houseModel.find({});
        users.sort((a, b) => (a.userAtive === false && b.userAtive === true) ? -1 : 1);


        return [null, houses];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }

};

const getHousesById = async (id) => {
    try {
        const house = await houseModel.findById(id).exec();
        return [null, house];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }

}


const getHousesByUserId = async (userId) => {
    try {
        const houses = await houseModel.find({ userId: userId }).exec();
        return [null, houses];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};


const createHouse = async (title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId) => {
    try {
        const newHouse = new houseModel({
            title: title,
            description: description,
            imageSrc: imageSrc,
            category: category,
            roomCount: roomCount,
            bathroomCount: bathroomCount,
            guestCount: guestCount,
            locationValue: locationValue,
            amenities: amenities,
            price: price,
            userId: userId,
        });

        const savedHouse = await newHouse.save();

        return [null, savedHouse];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const updateHouse = async (id, title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue, amenities, price, userId) => {
    if (id === undefined) {
        const error = "Invalid ID";
        return [error, null];
    }

    try {
        const house = await houseModel.findById(id);

        if (!house) {
            const error = "House with the provided ID has not been found";
            return [error, null];
        }

        const existingHouse = await houseModel.findOne({ title: title, _id: { $ne: id } });
        if (existingHouse) {
            const error = "Title is already in use by another house.";
            return [error, null];
        }

        if (title !== "") {
            house.title = title;
        } else {
            house.title = house.title;
        }

        house.description = description;
        house.imageSrc = imageSrc;
        house.category = category;
        house.roomCount = roomCount;
        house.bathroomCount = bathroomCount;
        house.guestCount = guestCount;
        house.locationValue = locationValue;
        house.amenities = amenities;
        house.price = price;
        house.userId = userId;

        await house.save();

        return [null, house];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const removeHouse = async (id) => {
    try {
        const house = await houseModel.findById(id);

        if (!house) {
            const error = "No house found with that ID";
            return [error, null];
        }

        await house.deleteOne();

        return [null, house];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};




export default {
    getAllHouses,
    getHousesById,
    getHousesByUserId,
    createHouse,
    updateHouse,
    removeHouse
}