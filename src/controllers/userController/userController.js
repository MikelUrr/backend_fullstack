import ContactmeModel from "../../models/contactmeModel.js"


const getAllContacts = async () =>{
    try {
        const contacts = await ContactmeModel.find({});
        return [null, contacts];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
}

const getContactsById = async (id) =>{
    try {
        const contact = await ContactmeModel.findById(id).exec();
        return [null, contact];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
}

const updateContact = async (id, firstName, lastName, email, phoneNumber, topic,message,answered,conctactDate) =>{
    try {
        const contact = await ContactmeModel.findById(id);

        if (!entry) {
            const error = "No record found with that ID.";
            return [error, null];
        }

        contact.firstName = firstName || contact.firstName;
        contact.lastName = lastName || contact.lastName;
        contact.email = email || contact.email;
        contact.phoneNumber = phoneNumber || contact.phoneNumber;
        contact.topic = topic || contact.topic;
        contact.message = message || contact.message;
        contact.answered = answered || contact.answered;
        contact.conctactDate=conctactDate || contact.conctactDate

        await contact.save();

        return [null, contact];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }

}

const removeContact = async (id) =>{
    try {
        const contact = await ContactmeModel.findById(id);

        if (!contact) {
            const error = "No record found with that ID.";
            return [error, null];
        }

        await contact.deleteOne();

        return [null, contact];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
}

const createContact = async (firstName, lastName, email, phoneNumber, topic,message) =>{

    try {
        const newContact = new ContactmeModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            topic: topic,
            message:message,
        });

        const savedContact = await newContact.save();
        return [null, savedContact];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};






export default {
    getAllContacts,
    getContactsById,
    updateContact,
    removeContact,
    createContact
};