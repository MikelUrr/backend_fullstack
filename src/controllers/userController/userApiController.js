import contactmeController from "./contactmeController.js";

const  getAllContacts = async (req, res) =>{
    try {
        const errorMessage = req.query.error;
        const [error, contacts] = await contactmeController.getAllContacts();
        if (error) {
            return res.status(500).json({ error: error });
        }
        res.status(200).json({ contacts, errorMessage, session: req.session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

const getContactsById = async (req, res) => {
    const id = req.params.id;
    try {
        const [error, contact] = await contactmeController.getContactsById(id);
        if (error) {
            return res.status(404).json({ error: error });
        }
        res.status(200).json({ contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}


const updateContact = async (req,res) =>{

    const { id, firstName, lastName, email, phoneNumber, topic, message, answered, conctactDate } = req.body;

    try {
        const [error, contact] = await contactmeController.updateContact(id, firstName, lastName, email, phoneNumber, topic, message, answered, conctactDate);

        if (error) {
            return res.status(404).json({ error: "No record found with that ID." });
        }

        return res.status(200).json({ success: true, contact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

const removeContact = async (req, res) => {
    const { id } = req.body;

    try {
        const [error, contact] = await contactmeController.removeContact(id);

        if (error) {
            return res.status(404).json({ error: "No record found with that ID." });
        }

        return res.status(200).json({ success: true, contact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};


const createContact = async (firstName, lastName, email, phoneNumber, topic, message) => {
    try {
        // Construct your message with the contact information
        const telegramMessage = `
            New Contact:
            Name: ${firstName} ${lastName}
            Email: ${email}
            Phone Number: ${phoneNumber}
            Topic: ${topic}
            Message: ${message}
        `;

        // Send message to Telegram
        const telegramMessageSent = await sendTelegramMessage(telegramMessage);

        if (telegramMessageSent) {
            
            const [error,contact] = await contactmeController.createContact(firstName, lastName, email, phoneNumber, topic, message);
            res.status(201).json({ contact });
        } else {
            throw new Error('Failed to send Telegram message.');
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const sendTelegramMessage = async (message) => {
    try {
        const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN';
        const chatId = 'YOUR_TELEGRAM_CHAT_ID';
        const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        const responseData = await response.json();

        if (!responseData.ok) {
            throw new Error(responseData.description);
        }

        return true;
    } catch (error) {
        console.error('Error sending Telegram message:', error.message);
        return false;
    }
};


export default {
    getAllContacts,
    getContactsById,
    updateContact,
    removeContact,
    createContact
};