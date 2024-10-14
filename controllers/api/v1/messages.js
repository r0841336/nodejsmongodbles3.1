const Message = require("../../../models/api/v1/Message");

const create = (req, res) => {

    const text = req.body.message.text;
    const user = req.body.message.user;

    const m = new Message({ user: user, text: text });
    m.save().then(() => {

        res.json({
            status: "succes", 
            data: {
                message: m,
            },
        });

    });

};

const index = async (req, res) => {

    const messages = await Message.find();
    res.json({
        status: "succes",
        data:{ 
            messages: messages,
        },
    });

};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params; // Haal het ID uit de URL
        const message = await Message.findByIdAndDelete(id); // Zoek en verwijder het bericht

        if (!message) {
            return res.status(404).json({ status: "error", message: "Bericht niet gevonden" });
        }

        res.json({ status: "success", message: "Bericht succesvol verwijderd" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
    }
};

module.exports = {
    create,
    index,
    deleteMessage,
};